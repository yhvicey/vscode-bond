import { Syntax, UnknownSyntax, AttributeSyntax, AttributableSyntax, SyntaxType } from "../Syntax";
import { Token, TokenType } from "../Lexical";

export default abstract class ParserBase<S extends Syntax> {
    public get childSyntaxes(): Syntax[] {
        return this.syntaxes.slice();
    }

    protected get isTakingFinished() {
        return !this.canTake;
    }

    private attributes: AttributeSyntax[] = [];
    private canTake: boolean = true;
    private childParser: ParserBase<Syntax> | null = null;
    private composed: boolean = false;
    private result: S | UnknownSyntax | null = null;
    private syntaxes: Syntax[] = [];
    private tokens: Token[] = [];

    public addChildSyntax(syntax: Syntax) {
        for (const token of syntax.tokens) {
            this.tokens.push(token);
        }
        if (syntax.type === SyntaxType.AttributeSyntax) {
            this.stageAttribute(syntax as AttributeSyntax);
        } else {
            this.syntaxes.push(syntax);
        }
    }

    public compose(attributes?: AttributeSyntax[]) {
        if (this.composed) {
            if (this.result === null) {
                throw Error("Parser already composed and result not cached.");
            } else {
                return this.result;
            }
        }
        if (this.childParser !== null) {
            // Force compose child parser
            this.addChildSyntax(this.composeChildParser());
        }
        if (this.canTake) {
            // Unfinished, return UnknownSyntax
            this.result = new UnknownSyntax(this.tokens, this.syntaxes);
        } else {
            this.result = this.onCompose(
                this.tokens,
                this.syntaxes,
                attributes || []);
        }
        return this.result;
    }

    public take(token: Token, next?: Token): boolean {
        this.onTake(token.type, next === undefined ? undefined : next.type);
        this.tokens.push(token);
        if (this.childParser !== null) {
            // Delegate to child parser
            const canTake = this.childParser.take(token, next);
            if (!canTake) {
                this.addChildSyntax(this.composeChildParser());
            }
        }
        return this.canTake;
    }

    protected finishTaking() {
        this.canTake = false;
    }

    protected useChildParser(parser: ParserBase<Syntax>) {
        if (this.childParser !== null) {
            // Force compose child parser
            this.addChildSyntax(this.composeChildParser());
        }
        this.childParser = parser;
    }

    protected abstract onCompose(
        tokens: Token[],
        syntaxes: Syntax[],
        attributes: AttributeSyntax[]): S;

    protected onChildParserCompose(childParser: ParserBase<Syntax>) {
        // No-op;
    }

    protected abstract onTake(tokenType: TokenType, nextTokenType?: TokenType): void;

    private composeChildParser() {
        if (this.childParser === null) {
            throw new Error("No child parser for composing.");
        }
        const childParser = this.childParser;
        this.childParser = null;
        this.onChildParserCompose(childParser);
        return childParser.compose(this.attributes);
    }

    private stageAttribute(attribute: AttributeSyntax) {
        this.attributes.push(attribute);
    }
}

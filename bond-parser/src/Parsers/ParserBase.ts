import { Syntax, UnknownSyntax } from "../Syntax";
import { Token, TokenType } from "../Lexical";

export default abstract class ParserBase<S extends Syntax> {
    public get childSyntaxes(): Syntax[] {
        return this.syntaxes.slice();
    }

    protected get isTakingFinished() {
        return !this.canTake;
    }

    private canTake: boolean = true;
    private childParser: ParserBase<Syntax> | null = null;
    private composed: boolean = false;
    private result: S | UnknownSyntax | null = null;
    private syntaxes: Syntax[] = [];
    private tokens: Token[] = [];

    public compose() {
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
            this.result = this.onCompose(this.tokens, this.syntaxes);
        }
        return this.result;
    }

    public addChildSyntax(syntax: Syntax) {
        for (const token of syntax.tokens) {
            this.tokens.push(token);
        }
        this.syntaxes.push(syntax);
    }

    public take(token: Token): boolean {
        this.onTake(token.type);
        this.tokens.push(token);
        if (this.childParser !== null) {
            // Delegate to child parser
            const canTake = this.childParser.take(token);
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
            this.composeChildParser();
        }
        this.childParser = parser;
    }

    protected abstract onCompose(tokens: Token[], syntaxes: Syntax[]): S;

    protected onChildParserCompose(childParser: ParserBase<Syntax>) {
        // No-op;
    }

    protected abstract onTake(tokenType: TokenType): void;

    private composeChildParser() {
        if (this.childParser === null) {
            throw new Error("No child parser for composing.");
        }
        const childParser = this.childParser;
        this.childParser = null;
        this.onChildParserCompose(childParser);
        return childParser.compose();
    }
}

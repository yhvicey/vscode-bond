import { Token, TokenType } from "../Lexical";
import TokenWalker from "../Utils/TokenWalker";
import { Syntax } from "../Syntax";
import { ComplexSyntaxHelper } from "../Utils";
import ComplexSyntax from "../Syntax/ComplexSyntax";

export default abstract class ParserBase {
    private readonly walker: TokenWalker;
    private readonly stopTokenTypes: TokenType[];

    public constructor(tokens: Token[]) {
        this.stopTokenTypes = this.getStopTokenTypes();
        this.walker = new TokenWalker(tokens, this.stopTokenTypes);
    }

    public parse(): Syntax[] {
        const syntaxes: Syntax[] = [];
        while (true) {
            const syntax = this.next();
            if (syntax === null) {
                return syntaxes;
            } else {
                syntaxes.push(syntax);
            }
        }
    }

    protected abstract getStopTokenTypes(): TokenType[];

    protected abstract handleSegment(tokens: Token[]): Syntax;

    private next(): Syntax | null {
        if (!this.walker.advanceToNextSegmentStart()) {
            return null;
        } else {
            const syntax = this.handleSegment(this.walker.segment);
            if (syntax.isComplexSyntax) {
                // Create corresponding parser for complex syntax
                const parser = ComplexSyntaxHelper.createParser(syntax);
                (syntax as ComplexSyntax).syntaxes = parser.parse();
            }
            this.walker.commit();
            return syntax;
        }
    }
}

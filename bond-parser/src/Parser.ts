import { Token, TokenType } from "./Lexical";
import TokenHelper from "./Utils/TokenHelper";
import {
    Syntax,
    UnknownSyntax
} from "./Syntax";

export default class Parser {
    private readonly tokensHelper: TokenHelper;
    private readonly tokenQueue: Token[] = [];
    private readonly syntaxQueue: Syntax[] = [];
    private readonly triviaTokenTypes: TokenType[] = [
        TokenType.WhitespaceToken,
        TokenType.SingleLineCommentToken,
        TokenType.MultiLineCommentToken,
        TokenType.EndOfLineToken,
    ];

    public constructor(tokens: Token[]) {
        this.tokensHelper = new TokenHelper(tokens, [
            TokenType.NamespaceKeywordToken, TokenType.ImportKeywordToken,
            TokenType.OpenBraceToken, TokenType.CloseBraceToken,
            TokenType.OpenBracketToken, TokenType.CloseBracketToken,
            TokenType.OpenParenToken, TokenType.CloseParenToken,
            TokenType.ColonToken, TokenType.SemicolonToken,
            TokenType.LessThanToken, TokenType.GreaterThanToken,
        ]);
    }

    public parse(): Syntax[] {
        const syntaxes: Syntax[] = [];
        let syntax = this.nextSyntax();
        while (syntax !== null) {
            syntaxes.push(syntax);
            syntax = this.nextSyntax();
        }
        return syntaxes;
    }

    private nextSyntax(): Syntax | null {
        let syntax: Syntax | null = null;
        if (!this.tokensHelper.advanceToNextSegmentStart()) {
            return syntax;
        } else {
            syntax = new UnknownSyntax(this.tokensHelper.segment);
        }
        this.tokensHelper.commit();
        return syntax;
    }
}

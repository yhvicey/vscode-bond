import { Token, TokenType } from "./Lexical";
import TokenWalker from "./Utils/TokenWalker";
import {
    Syntax,
    UnknownSyntax,
    ImportSyntax,
    NamespaceSyntax
} from "./Syntax";
import { SyntaxHelper } from "./Utils";

export default class Parser {
    private readonly tokensHelper: TokenWalker;
    private readonly finalizedSyntaxes: Syntax[] = [];
    private readonly triviaTokenTypes: TokenType[] = [
        TokenType.WhitespaceToken,
        TokenType.SingleLineCommentToken,
        TokenType.MultiLineCommentToken,
        TokenType.EndOfLineToken,
    ];

    private currentParsing: TokenType[] = [];
    private tokensStacks: {
        [depth: number]: Token[]
    } = [];
    private syntaxesStack: Syntax[] = [];

    public constructor(tokens: Token[]) {
        this.tokensHelper = new TokenWalker(tokens, [
            TokenType.OpenBraceToken, TokenType.CloseBraceToken,
            TokenType.OpenBracketToken, TokenType.CloseBracketToken,
            TokenType.OpenParenToken, TokenType.CloseParenToken,
            TokenType.ColonToken, TokenType.SemicolonToken,
        ]);
    }

    public parse(): Syntax[] {
        do {
            const current = this.tokensHelper.current;
            if (current === undefined) {
                // EOF, break loop
                break;
            }

            switch (current.type) {

            }

            this.tokensStack.push(current);

            if (current.type === TokenType.EndOfLineToken && this.crossLineMode === CrossLineMode.None) {
                // Only trigger parse on EOL && CrossLineMode === None
                this.compose();
            }
        }
        while (this.tokensHelper.advance());

        if (this.tokensStack.length !== 0) {
            this.finalizedSyntaxes.push(new UnknownSyntax(this.tokensStack));
        }

        return this.finalizedSyntaxes;
    }

    private compose() {
        const syntax = this.tryGetSyntax(this.tokensStack);
        if (syntax !== null) {
            this.stageSyntax(syntax);
            const composedSyntax = this.tryComposeSyntaxes(this.syntaxesStack);
            if (composedSyntax !== null) {
                this.stageSyntax(composedSyntax);
            }
        }
    }

    private getNonTriviaTokens(tokens: Token[]) {
        return tokens.filter(token => !this.isTriviaToken(token));
    }

    private isTriviaToken(token: Token) {
        return this.triviaTokenTypes.includes(token.type);
    }

    private stageSyntax(syntax: Syntax) {
        // If is top-level syntax, then push to finalized array
        if (SyntaxHelper.isTopLevelSyntax(syntax)) {
            this.finalizedSyntaxes.push(syntax);
        } else {
            // Otherwise push to un-finalized array
            this.syntaxesStack.push(syntax);
        }
        // Clear the tokens stack
        this.tokensStack = [];
    }

    private tryGetSyntax(tokens: Token[]): Syntax | null {
        const nonTriviaTokens = this.getNonTriviaTokens(tokens);
        if (nonTriviaTokens.length === 0) {
            return null;
        }

        if (SyntaxHelper.isImportSyntax(nonTriviaTokens)) {
            return new ImportSyntax(nonTriviaTokens);
        } else if (SyntaxHelper.isNamespaceSyntax(nonTriviaTokens)) {
            return new NamespaceSyntax(nonTriviaTokens);
        } else {
            return null;
        }
    }

    private tryComposeSyntaxes(syntaxes: Syntax[]): Syntax | null {
        return null;
    }
}

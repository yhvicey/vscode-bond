import Syntax, { SyntaxType } from "./Syntax";
import { Token, TokenType } from "../Lexical";
import { TokenHelper } from "../Utils";

export default class AttributeSyntax extends Syntax {
    public className?: string;

    public constructor(tokens: Token[]) {
        super(SyntaxType.AttributeSyntax, tokens);
    }

    protected processTokens(tokens: Token[]) {
        // Find attribute class name
        const firstIdentifierIndex = TokenHelper.indexOf(
            tokens,
            token => token.type === TokenType.IdentifierToken
        );
        const lastIndex = TokenHelper.indexOf(
            tokens,
            token => token.type !== TokenType.IdentifierToken
                && token.type !== TokenType.DotToken,
            firstIdentifierIndex
        );
        if (firstIdentifierIndex !== -1 && lastIndex !== -1) {
            this.className = TokenHelper.composeIdentifiers(
                tokens.slice(firstIdentifierIndex, lastIndex));
        }
    }
}

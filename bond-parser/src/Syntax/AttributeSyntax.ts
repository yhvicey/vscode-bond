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
        const firstOpenParenIndex = TokenHelper.indexOf(
            tokens,
            token => token.type === TokenType.OpenParenToken
        );
        if (firstIdentifierIndex !== -1 && firstOpenParenIndex !== -1) {
            this.className = TokenHelper.composeIdentifiers(
                tokens.slice(firstIdentifierIndex, firstOpenParenIndex));
        }
    }
}

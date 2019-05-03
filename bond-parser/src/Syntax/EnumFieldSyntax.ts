import Syntax, { SyntaxType } from "./Syntax";
import AttributableSyntax from "./AttributableSyntax";
import { Token, TokenType, NumberToken } from "../Lexical";
import { AttributeSyntax } from ".";
import { TokenHelper } from "../Utils";

export default class EnumFieldSyntax extends AttributableSyntax {
    public name?: string;
    public value?: string;

    public constructor(tokens: Token[], _: Syntax[], attributes: AttributeSyntax[]) {
        super(SyntaxType.EnumFieldSyntax, tokens, [], attributes);
    }

    protected processTokens(tokens: Token[]) {
        // Find attribute class name
        const firstIdentifierIndex = TokenHelper.indexOf(
            tokens,
            token => token.type === TokenType.IdentifierToken
        );
        if (firstIdentifierIndex !== -1) {
            this.name = TokenHelper.composeIdentifiers(
                tokens.slice(firstIdentifierIndex, firstIdentifierIndex + 1));
        }
        // Find value
        const valueIndex = TokenHelper.indexOf(
            tokens,
            token => token.type === TokenType.NumberToken,
            firstIdentifierIndex
        );
        if (valueIndex !== -1) {
            this.value = (tokens[valueIndex] as NumberToken).numberLiteral;
        }
    }
}

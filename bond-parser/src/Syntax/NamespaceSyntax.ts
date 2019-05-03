import Syntax, { SyntaxType } from "./Syntax";
import { Token, TokenType } from "../Lexical";
import { TokenHelper } from "../Utils";
import { ComplexSyntax } from ".";

export default class NamespaceSyntax extends ComplexSyntax {
    public name?: string;

    public constructor(tokens: Token[], syntaxes: Syntax[]) {
        super(SyntaxType.NamespaceSyntax, tokens, syntaxes);
    }

    protected processTokens(tokens: Token[]) {
        // Find namespace name
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
            this.name = TokenHelper.composeIdentifiers(
                tokens.slice(firstIdentifierIndex, lastIndex));
        }
    }
}

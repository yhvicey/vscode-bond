import Syntax, { SyntaxType } from "./Syntax";
import { Token, TokenType, IdentifierToken, DotToken } from "../Lexical";

export default class NamespaceSyntax extends Syntax {
    public namespace: string;

    public constructor(tokens: Token[]) {
        super(SyntaxType.NamespaceSyntax, tokens);
        // [0: NamespaceToken] [...: Array<IdentifierToken | DotToken>]
        this.namespace = tokens.slice(1).map(token => {
            switch (token.type) {
                case TokenType.IdentifierToken: {
                    return (token as IdentifierToken).identifier;
                }
                case TokenType.DotToken: {
                    return DotToken.Raw;
                }
                default: {
                    return "";
                }
            }
        }).join("");
    }
}

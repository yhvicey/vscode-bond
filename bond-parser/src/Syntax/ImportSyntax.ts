import Syntax, { SyntaxType } from "./Syntax";
import { Token, TokenType, StringToken } from "../Lexical";
import { TokenHelper } from "../Utils";

export default class ImportSyntax extends Syntax {
    public path?: string;

    public constructor(tokens: Token[]) {
        super(SyntaxType.ImportSyntax, tokens);
    }

    protected processTokens(tokens: Token[]) {
        // Find string literal
        const stringLiteralIndex = TokenHelper.indexOf(
            tokens,
            token => token.type === TokenType.StringToken
        );
        if (stringLiteralIndex !== -1) {
            this.path = (tokens[stringLiteralIndex] as StringToken).stringLiteral;
        }
    }
}

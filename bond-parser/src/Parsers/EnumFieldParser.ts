import ParserBase from "./ParserBase";
import { TokenType, Token } from "../Lexical";
import { Syntax, EnumFieldSyntax, AttributeSyntax } from "../Syntax";

export default class EnumFieldParser extends ParserBase<EnumFieldSyntax> {
    protected onCompose(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        return new EnumFieldSyntax(tokens, syntaxes, attributes);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet ",", ";", "}" or EOL
        if (tokenType === TokenType.CommaToken
            || tokenType === TokenType.SemicolonToken
            || tokenType === TokenType.CloseBraceToken
            || tokenType === TokenType.EndOfLineToken) {
            this.finishTaking();
        }
    }
}

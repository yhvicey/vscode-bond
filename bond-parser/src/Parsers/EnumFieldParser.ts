import ParserBase from "./ParserBase";
import { TokenType, Token } from "../Lexical";
import { Syntax } from "../Syntax";
import EnumFieldSyntax from "../Syntax/EnumFieldSyntax";

export default class EnumFieldParser extends ParserBase<EnumFieldSyntax> {
    protected onCompose(tokens: Token[], _: Syntax[]) {
        return new EnumFieldSyntax(tokens);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet "," or "}"
        if (tokenType === TokenType.CommaToken
            || tokenType === TokenType.CloseBraceToken) {
            this.finishTaking();
        }
    }
}

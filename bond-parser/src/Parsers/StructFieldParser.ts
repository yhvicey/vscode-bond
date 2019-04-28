import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { Syntax } from "../Syntax";
import StructFieldSyntax from "../Syntax/StructFieldSyntax";

export default class StructFieldParser extends ParserBase<StructFieldSyntax> {
    protected onCompose(tokens: Token[], _: Syntax[]) {
        return new StructFieldSyntax(tokens);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet ";"
        if (tokenType === TokenType.SemicolonToken) {
            this.finishTaking();
        }
    }
}

import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { ImportSyntax, Syntax } from "../Syntax";

export default class ImportParser extends ParserBase<ImportSyntax> {
    protected onCompose(tokens: Token[]) {
        return new ImportSyntax(tokens);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet ";" or EOL
        if (tokenType === TokenType.SemicolonToken
            || tokenType === TokenType.EndOfLineToken) {
            this.finishTaking();
        }
    }
}

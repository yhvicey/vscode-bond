import ParserBase from "./ParserBase";
import AttributeParser from "./AttributeParser";
import EnumParser from "./EnumParser";
import ImportParser from "./ImportParser";
import NamespaceParser from "./NamespaceParser";
import StructParser from "./StructParser";
import { Token, TokenType } from "../Lexical";
import { ScriptSyntax, Syntax } from "../Syntax";

export default class ScriptParser extends ParserBase<ScriptSyntax> {
    public onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new ScriptSyntax(tokens, syntaxes);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.ImportKeywordToken:
                this.useChildParser(new ImportParser()); break;
            case TokenType.NamespaceKeywordToken:
                this.useChildParser(new NamespaceParser()); break;
        }
        // Stop when meet EOF
        if (tokenType === TokenType.EndOfFileToken) {
            this.finishTaking();
        }
    }
}

import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { ScriptSyntax, Syntax } from "../Syntax";
import ImportParser from "./ImportParser";
import NamespaceParser from "./NamespaceParser";
import EnumParser from "./EnumParser";
import StructParser from "./StructParser";

export default class ScriptParser extends ParserBase<ScriptSyntax> {
    public onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new ScriptSyntax(syntaxes, tokens);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.ImportKeywordToken:
                this.useChildParser(new ImportParser()); break;
            case TokenType.NamespaceKeywordToken:
                this.useChildParser(new NamespaceParser()); break;
            case TokenType.EnumKeywordToken:
                this.useChildParser(new EnumParser()); break;
            case TokenType.StructKeywordToken:
                this.useChildParser(new StructParser()); break;
        }
        // Stop when meet EOF
        if (tokenType === TokenType.EndOfFileToken) {
            this.finishTaking();
        }
    }
}

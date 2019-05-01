import ParserBase from "./ParserBase";
import AttributeParser from "./AttributeParser";
import EnumParser from "./EnumParser";
import ImportParser from "./ImportParser";
import NamespaceParser from "./NamespaceParser";
import StructParser from "./StructParser";
import { Token, TokenType } from "../Lexical";
import { ScriptSyntax, Syntax } from "../Syntax";

export default class ScriptParser extends ParserBase<ScriptSyntax> {
    private isParsingAttributable: boolean = false;

    public onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new ScriptSyntax(tokens, syntaxes);
    }

    protected onChildParserCompose(childParser: ParserBase<ScriptSyntax>) {
        this.isParsingAttributable = false;
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.OpenBracketToken: {
                if (!this.isParsingAttributable) {
                    this.useChildParser(new AttributeParser());
                }
                break;
            }
            case TokenType.EnumKeywordToken: {
                this.useChildParser(new EnumParser());
                this.isParsingAttributable = true;
                break;
            }
            case TokenType.ImportKeywordToken:
                this.useChildParser(new ImportParser()); break;
            case TokenType.NamespaceKeywordToken:
                this.useChildParser(new NamespaceParser()); break;
            case TokenType.StructKeywordToken: {
                this.useChildParser(new StructParser());
                this.isParsingAttributable = true;
                break;
            }
        }
        // Stop when meet EOF
        if (tokenType === TokenType.EndOfFileToken) {
            this.finishTaking();
        }
    }
}

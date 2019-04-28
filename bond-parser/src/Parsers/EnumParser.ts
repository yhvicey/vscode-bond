import ParserBase from "./ParserBase";
import { TokenType, Token } from "../Lexical";
import { Syntax } from "../Syntax";
import EnumSyntax from "../Syntax/EnumSyntax";
import EnumFieldParser from "./EnumFieldParser";

export default class EnumParser extends ParserBase<EnumSyntax> {
    private parsingFieldWithAttribute: boolean = false;

    protected onChildParserCompose() {
        this.parsingFieldWithAttribute = false;
    }

    protected onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new EnumSyntax(syntaxes, tokens);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            // For attributes
            case TokenType.OpenBracketToken: {
                this.parsingFieldWithAttribute = true;
                this.useChildParser(new EnumFieldParser());
                break;
            }
            case TokenType.IdentifierToken: {
                if (!this.parsingFieldWithAttribute) {
                    this.useChildParser(new EnumFieldParser());
                }
                break;
            }
        }
        // Stop when meet "}"
        if (tokenType === TokenType.CloseBraceToken) {
            this.finishTaking();
        }
    }
}

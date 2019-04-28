import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { Syntax } from "../Syntax";
import StructSyntax from "../Syntax/StructSyntax";
import StructFieldParser from "./StructFieldParser";

export default class StructParser extends ParserBase<StructSyntax> {
    private parsingFieldWithAttribute: boolean = false;

    protected onChildParserCompose() {
        this.parsingFieldWithAttribute = false;
    }

    protected onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new StructSyntax(syntaxes, tokens);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.OpenBracketToken: {
                this.parsingFieldWithAttribute = true;
                this.useChildParser(new StructFieldParser());
                break;
            }
            case TokenType.NumberToken: {
                if (!this.parsingFieldWithAttribute) {
                    this.useChildParser(new StructFieldParser());
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

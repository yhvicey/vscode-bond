import ParserBase from "./ParserBase";
import AttributeParser from "./AttributeParser";
import StructFieldParser from "./StructFieldParser";
import { Token, TokenType } from "../Lexical";
import { Syntax, StructSyntax, AttributeSyntax } from "../Syntax";

export default class StructParser extends ParserBase<StructSyntax> {
    private isParsingField: boolean = false;

    protected onChildParserCompose() {
        this.isParsingField = false;
    }

    protected onCompose(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        return new StructSyntax(tokens, syntaxes, attributes);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.NumberToken: {
                if (!this.isParsingField) {
                    this.useChildParser(new StructFieldParser());
                    this.isParsingField = true;
                }
                break;
            }
            case TokenType.OpenBracketToken:
                this.useChildParser(new AttributeParser()); break;
        }
        // Stop when meet "}"
        if (tokenType === TokenType.CloseBraceToken) {
            this.finishTaking();
        }
    }
}

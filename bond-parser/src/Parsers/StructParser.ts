import ParserBase from "./ParserBase";
import AttributeParser from "./AttributeParser";
import StructFieldParser from "./StructFieldParser";
import { Token, TokenType } from "../Lexical";
import { Syntax, StructSyntax, AttributeSyntax } from "../Syntax";

export default class StructParser extends ParserBase<StructSyntax> {
    protected onCompose(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        return new StructSyntax(tokens, syntaxes, attributes);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.NumberToken:
                this.useChildParser(new StructFieldParser()); break;
            case TokenType.OpenBracketToken:
                this.useChildParser(new AttributeParser()); break;
        }
        // Stop when meet "}"
        if (tokenType === TokenType.CloseBraceToken) {
            this.finishTaking();
        }
    }
}

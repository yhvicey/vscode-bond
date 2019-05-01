import ParserBase from "./ParserBase";
import AttributeParser from "./AttributeParser";
import EnumFieldParser from "./EnumFieldParser";
import { TokenType, Token } from "../Lexical";
import { Syntax, EnumSyntax, AttributeSyntax } from "../Syntax";

export default class EnumParser extends ParserBase<EnumSyntax> {
    private metFirstIdentifier: boolean = false;

    protected onCompose(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        return new EnumSyntax(tokens, syntaxes, attributes);
    }

    protected onTake(tokenType: TokenType) {
        switch (tokenType) {
            case TokenType.OpenBracketToken:
                this.useChildParser(new AttributeParser()); break;
            case TokenType.IdentifierToken:
                if (this.metFirstIdentifier) {
                    this.useChildParser(new EnumFieldParser());
                } else {
                    this.metFirstIdentifier = true;
                }
                break;
        }
        // Stop when meet "}"
        if (tokenType === TokenType.CloseBraceToken) {
            this.finishTaking();
        }
    }
}

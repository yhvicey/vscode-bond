import ParserBase from "./ParserBase";
import { TokenType, Token } from "../Lexical";
import { AttributeSyntax } from "../Syntax";

export default class AttributeParser extends ParserBase<AttributeSyntax> {
    protected onCompose(tokens: Token[]) {
        return new AttributeSyntax(tokens);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet "]"
        if (tokenType === TokenType.CloseBracketToken) {
            this.finishTaking();
        }
    }
}

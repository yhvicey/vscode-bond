import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { Syntax, StructFieldSyntax, AttributeSyntax } from "../Syntax";

export default class StructFieldParser extends ParserBase<StructFieldSyntax> {
    protected onCompose(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        return new StructFieldSyntax(tokens, syntaxes, attributes);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet ";" or "}"
        if (tokenType === TokenType.SemicolonToken
            || tokenType === TokenType.CloseBraceToken) {
            this.finishTaking();
        }
    }
}

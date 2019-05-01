import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { Syntax, StructFieldSyntax, AttributeSyntax } from "../Syntax";

export default class StructFieldParser extends ParserBase<StructFieldSyntax> {
    protected onCompose(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        return new StructFieldSyntax(tokens, syntaxes, attributes);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet ";", "}" or EOL
        if (tokenType === TokenType.SemicolonToken
            || tokenType === TokenType.CloseBraceToken
            || tokenType === TokenType.EndOfLineToken) {
            this.finishTaking();
        }
    }
}

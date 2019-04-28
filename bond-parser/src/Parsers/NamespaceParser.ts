import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { NamespaceSyntax, Syntax } from "../Syntax";

export default class NamespaceParser extends ParserBase<NamespaceSyntax> {
    protected onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new NamespaceSyntax(tokens);
    }

    protected onTake(tokenType: TokenType) {
        // Stop when meet ";" or EOL
        if (tokenType === TokenType.SemicolonToken
            || tokenType === TokenType.EndOfLineToken) {
            this.finishTaking();
        }
    }
}

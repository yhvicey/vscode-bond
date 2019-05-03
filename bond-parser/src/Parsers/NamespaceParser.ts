import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";
import { NamespaceSyntax, Syntax } from "../Syntax";
import AttributeParser from "./AttributeParser";
import EnumParser from "./EnumParser";
import StructParser from "./StructParser";

export default class NamespaceParser extends ParserBase<NamespaceSyntax> {
    private isParsingAttributable: boolean = false;

    protected onCompose(tokens: Token[], syntaxes: Syntax[]) {
        return new NamespaceSyntax(tokens, syntaxes);
    }

    protected onChildParserCompose(childParser: ParserBase<NamespaceSyntax>) {
        this.isParsingAttributable = false;
    }

    protected onTake(tokenType: TokenType, next?: TokenType) {
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
            case TokenType.StructKeywordToken: {
                this.useChildParser(new StructParser());
                this.isParsingAttributable = true;
                break;
            }
        }
        // Stop when meet EOF or next is "namespace"
        if (tokenType === TokenType.EndOfFileToken
            || next === TokenType.NamespaceKeywordToken) {
            this.finishTaking();
        }
    }
}

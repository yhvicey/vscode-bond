import { Syntax, SyntaxType } from "../Syntax";
import { Token, TokenType } from "../Lexical";

export default class SyntaxHelper {
    public static isImportSyntax(tokens: Token[]) {
        return tokens.length === 2
            && tokens[0].type === TokenType.ImportKeywordToken
            && tokens[1].type === TokenType.StringToken;
    }

    public static isNamespaceSyntax(tokens: Token[]) {
        return tokens.length > 2
            && tokens[0].type === TokenType.NamespaceKeywordToken;
    }

    public static isTopLevelSyntax(syntax: Syntax) {
        return syntax.type === SyntaxType.UnknownSyntax
            || syntax.type === SyntaxType.ImportSyntax
            || syntax.type === SyntaxType.NamespaceSyntax;
    }
}

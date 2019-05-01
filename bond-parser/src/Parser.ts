import { Token, TokenType } from "./Lexical";
import { Syntax, ScriptSyntax, SyntaxType } from "./Syntax";
import { ScriptParser, ParserBase, ImportParser, NamespaceParser, EnumParser, StructParser } from "./Parsers";

export default class Parser {
    private readonly tokens: Token[];

    public constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public parse(): ScriptSyntax {
        const scriptParser = new ScriptParser();
        for (const token of this.tokens) {
            if (!scriptParser.take(token)) {
                // EOF
                break;
            }
        }
        let syntax = scriptParser.compose();
        if (syntax.type === SyntaxType.UnknownSyntax) {
            syntax = new ScriptSyntax(syntax.tokens, syntax.syntaxes);
        }
        return syntax;
    }
}

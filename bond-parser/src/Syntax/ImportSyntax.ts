import Syntax, { SyntaxType } from "./Syntax";
import { Token, StringToken } from "../Lexical";

export default class ImportSyntax extends Syntax {
    public get pathToken(): StringToken {
        return this.tokens[1] as StringToken;
    }

    public path: string;

    public constructor(tokens: Token[]) {
        super(SyntaxType.ImportSyntax, tokens);
        // [0: ImportToken] [1: StringToken]
        const stringLiteral = this.pathToken.stringLiteral;
        // Trim single/double quote
        this.path = stringLiteral.slice(1, stringLiteral.length - 2);
    }
}

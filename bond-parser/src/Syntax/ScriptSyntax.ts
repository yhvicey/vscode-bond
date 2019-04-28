import Syntax, { SyntaxType } from "./Syntax";
import ComplexSyntax from "./ComplexSyntax";
import { Token } from "../Lexical";

export default class ScriptSyntax extends ComplexSyntax {
    public constructor(syntaxes: Syntax[], tokens: Token[]) {
        super(SyntaxType.ScriptSyntax, tokens, syntaxes);
    }
}

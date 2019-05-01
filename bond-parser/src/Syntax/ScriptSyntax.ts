import Syntax, { SyntaxType } from "./Syntax";
import ComplexSyntax from "./ComplexSyntax";
import { Token } from "../Lexical";

export default class ScriptSyntax extends ComplexSyntax {
    public constructor(tokens: Token[], syntaxes: Syntax[]) {
        super(SyntaxType.ScriptSyntax, tokens, syntaxes);
    }
}

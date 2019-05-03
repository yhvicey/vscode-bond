import Syntax, { SyntaxType } from "./Syntax";
import ComplexSyntax from "./ComplexSyntax";
import { Token } from "../Lexical";
import { ImportSyntax, NamespaceSyntax } from ".";

export default class ScriptSyntax extends ComplexSyntax {
    public imports?: ImportSyntax[];
    public namespaces?: NamespaceSyntax[];

    public constructor(tokens: Token[], syntaxes: Syntax[]) {
        super(SyntaxType.ScriptSyntax, tokens, syntaxes);
    }
}

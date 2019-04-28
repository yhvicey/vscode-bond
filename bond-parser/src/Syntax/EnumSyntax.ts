import Syntax, { SyntaxType } from "./Syntax";
import ComplexSyntax from "./ComplexSyntax";
import { Token } from "../Lexical";

export default class EnumSyntax extends ComplexSyntax {
    public constructor(fields: Syntax[], tokens: Token[]) {
        super(SyntaxType.EnumSyntax, tokens, fields);
    }
}

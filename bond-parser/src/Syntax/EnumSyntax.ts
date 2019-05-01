import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";
import { AttributableSyntax, AttributeSyntax } from ".";

export default class EnumSyntax extends AttributableSyntax {
    public constructor(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        super(SyntaxType.EnumSyntax, tokens, syntaxes, attributes);
    }
}

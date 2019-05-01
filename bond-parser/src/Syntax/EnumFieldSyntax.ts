import Syntax, { SyntaxType } from "./Syntax";
import AttributableSyntax from "./AttributableSyntax";
import { Token } from "../Lexical";
import { AttributeSyntax } from ".";

export default class EnumFieldSyntax extends AttributableSyntax {
    public constructor(tokens: Token[], _: Syntax[], attributes: AttributeSyntax[]) {
        super(SyntaxType.EnumFieldSyntax, tokens, [], attributes);
    }
}

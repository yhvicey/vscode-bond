import Syntax, { SyntaxType } from "./Syntax";
import AttributeSyntax from "./AttributeSyntax";
import ComplexSyntax from "./ComplexSyntax";
import { Token } from "../Lexical";

export default class AttributableSyntax extends ComplexSyntax {
    public attributes: AttributeSyntax[] = [];

    public constructor(
        type: SyntaxType,
        tokens: Token[],
        syntaxes: Syntax[],
        attributes: AttributeSyntax[]) {
        super(type, tokens, syntaxes);
        let attr = attributes.pop();
        while (attr !== undefined) {
            this.attributes.push(attr);
            attr = attributes.pop();
        }
    }
}

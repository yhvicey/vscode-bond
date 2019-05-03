import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";
import { AttributableSyntax, AttributeSyntax, EnumFieldSyntax } from ".";

export default class EnumSyntax extends AttributableSyntax {
    public fields?: string[];

    public constructor(tokens: Token[], syntaxes: Syntax[], attributes: AttributeSyntax[]) {
        super(SyntaxType.EnumSyntax, tokens, syntaxes, attributes);
    }

    protected processSyntaxes(syntaxes: Syntax[]) {
        if (this.fields === undefined) {
            this.fields = [];
        }
        for (const syntax of syntaxes) {
            if (syntax.type === SyntaxType.EnumFieldSyntax) {
                const name = (syntax as EnumFieldSyntax).name;
                if (name !== undefined) {
                    this.fields.push(name);
                }
            }
        }
    }
}

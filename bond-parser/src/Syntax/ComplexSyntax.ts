import Syntax, { SyntaxType } from "./Syntax";

export default abstract class ComplexSyntax extends Syntax {
    public get isComplexSyntax() {
        return true;
    }

    public syntaxes: Syntax[];

    public constructor(syntaxType: SyntaxType, syntaxes: Syntax[]) {
        super(syntaxType, syntaxes.flatMap(syntax => syntax.tokens));
        this.syntaxes = syntaxes;
    }
}

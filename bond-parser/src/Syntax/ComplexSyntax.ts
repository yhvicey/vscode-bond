import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default abstract class ComplexSyntax extends Syntax {
    public get isComplexSyntax() {
        return true;
    }

    public syntaxes: Syntax[];

    public constructor(syntaxType: SyntaxType, tokens: Token[], syntaxes: Syntax[]) {
        super(syntaxType, tokens);
        this.syntaxes = syntaxes;
        this.processSyntaxes(this.syntaxes);
    }

    protected processSyntaxes(syntaxes: Syntax[]) {
        // No-op
    }
}

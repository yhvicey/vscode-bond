import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";
import ComplexSyntax from "./ComplexSyntax";

export default class UnknownSyntax extends ComplexSyntax {
    public tokens: Token[];
    public syntaxes: Syntax[];

    public constructor(tokens: Token[], syntaxes: Syntax[]) {
        super(SyntaxType.UnknownSyntax, tokens, syntaxes);
        this.tokens = tokens;
        this.syntaxes = syntaxes;
    }
}

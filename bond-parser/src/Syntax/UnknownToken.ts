import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class UnknownSyntax extends Syntax {
    public tokens: Token[];
    public syntaxes: Syntax[];

    public constructor(tokens: Token[], syntaxes: Syntax[] = []) {
        super(SyntaxType.UnknownSyntax, tokens);
        this.tokens = tokens;
        this.syntaxes = syntaxes;
    }
}

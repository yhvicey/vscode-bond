import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class UnknownSyntax extends Syntax {
    public unknownTokens: Token[];

    public constructor(tokens: Token[]) {
        super(SyntaxType.UnknownSyntax, tokens);
        this.unknownTokens = tokens;
    }
}

import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class StructFieldSyntax extends Syntax {
    public constructor(tokens: Token[]) {
        super(SyntaxType.StructFieldSyntax, tokens);
    }
}

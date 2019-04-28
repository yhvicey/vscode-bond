import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class EnumFieldSyntax extends Syntax {
    public constructor(tokens: Token[]) {
        super(SyntaxType.EnumFieldSyntax, tokens);
    }
}

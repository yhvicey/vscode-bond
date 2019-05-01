import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class AttributeSyntax extends Syntax {
    public constructor(tokens: Token[]) {
        super(SyntaxType.AttributeSyntax, tokens);
    }
}

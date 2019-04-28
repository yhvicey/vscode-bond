import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class NamespaceSyntax extends Syntax {

    public constructor(tokens: Token[]) {
        super(SyntaxType.NamespaceSyntax, tokens);
    }
}

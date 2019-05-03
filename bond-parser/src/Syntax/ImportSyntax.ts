import Syntax, { SyntaxType } from "./Syntax";
import { Token } from "../Lexical";

export default class ImportSyntax extends Syntax {
    public constructor(tokens: Token[]) {
        super(SyntaxType.ImportSyntax, tokens);
    }
}
import { Token } from "src/Lexical";
import { TextSpan } from "src/Document";

export enum SyntaxType {
    // Non-top level syntaxes

    // Top level syntaxes
}

export default abstract class Syntax extends TextSpan {
    public type: SyntaxType;

    protected tokens: Token[];

    public constructor(type: SyntaxType, tokens: Token[]) {
        const spanStart = tokens[0].start;
        const spanEnd = tokens[tokens.length - 1].end;
        const spanLength = spanEnd - spanStart;
        super(spanStart, spanLength);
        this.type = type;
        this.tokens = tokens;
    }
}

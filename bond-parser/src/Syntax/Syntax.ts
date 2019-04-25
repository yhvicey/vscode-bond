import { Token } from "../Lexical";
import TextSpan from "../TextSpan";

export enum SyntaxType {
    UnknownSyntax,
    // Non-top level syntaxes

    // Top level syntaxes
    ImportSyntax,
    NamespaceSyntax,
}

export default abstract class Syntax extends TextSpan {
    public get tokensCount() {
        return this.tokens.length;
    }

    public get isComplexSyntax() {
        return false;
    }

    public tokens: Token[];
    public type: SyntaxType;

    public constructor(type: SyntaxType, tokens: Token[]) {
        const spanStart = tokens[0].start;
        const spanEnd = tokens[tokens.length - 1].end;
        const spanLength = spanEnd - spanStart;
        super(spanStart, spanLength);
        this.type = type;
        this.tokens = tokens;
    }
}

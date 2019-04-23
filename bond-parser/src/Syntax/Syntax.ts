import { Token } from "../Lexical";
import { TextSpan } from "../Document";

export enum SyntaxType {
    // Non-top level syntaxes

    // Top level syntaxes
}

export default abstract class Syntax extends TextSpan {
    public type: SyntaxType;

    protected tokens: Token[];
    protected syntaxes?: Syntax[];

    public constructor(type: SyntaxType, tokens?: Token[], syntaxes?: Syntax[]) {
        if (tokens !== undefined) {
            // No op
        } else if (syntaxes !== undefined) {
            tokens = syntaxes.flatMap(syntax => syntax.tokens);
        } else {
            throw new Error("One of tokens or syntaxes must be provided.");
        }

        const spanStart = tokens[0].start;
        const spanEnd = tokens[tokens.length - 1].end;
        const spanLength = spanEnd - spanStart;
        super(spanStart, spanLength);
        this.type = type;
        this.tokens = tokens;
        this.syntaxes = syntaxes;
    }
}

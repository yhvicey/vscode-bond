import { Token } from "../Lexical";
import TextSpan from "../TextSpan";

export enum SyntaxType {
    UnknownSyntax,
    // Non-top level syntaxes

    // Top level syntaxes
}

export default abstract class Syntax extends TextSpan {
    public type: SyntaxType;

    protected tokens: Token[];
    protected syntaxes?: Syntax[];

    public constructor(type: SyntaxType, tokens?: Token[], syntaxes?: Syntax[]) {
        if (tokens !== undefined && syntaxes !== undefined) {
            throw new Error("Only one of tokens or syntaxes can be provided.");
        } else if (tokens === undefined && syntaxes === undefined) {
            throw new Error("One of tokens or syntaxes must be provided.");
        }

        if (tokens === undefined) {
            tokens = syntaxes!.flatMap(syntax => syntax.tokens);
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

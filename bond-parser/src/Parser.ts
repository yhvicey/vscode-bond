import { Token } from "./Lexical";
import Syntax from "./Syntax/Syntax";

export default class Parser {
    private readonly tokens: Token[];

    private readonly tokenQueue: Token[] = [];
    private readonly syntaxQueue: Syntax[] = [];

    public constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public parse(): Syntax[] {
        throw new Error("Not implemented yet.");
    }
}

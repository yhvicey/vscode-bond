import { Token } from "./Lexical";
import Syntax from "./Syntax/Syntax";

export default class Parser {
    private readonly tokens: Token[];

    public constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public parse(): Syntax[] {
        throw new Error("Not implemented yet.");
    }
}

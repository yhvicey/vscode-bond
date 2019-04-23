import ArrayHelper from "./ArrayHelper";
import { Token } from "src/Lexical";
import { Syntax } from "src/Syntax";

export default class TokenHelper extends ArrayHelper<Token, Token[]> {
    protected get length() {
        return this.tokens.length;
    }
    protected get defaultSegmentStopGroups() {
        return [[

        ]];
    }
    private readonly tokens: Token[];
    public constructor(tokens: Token[], segmentStop: Token[]) {
        super(segmentStop);
        this.tokens = tokens;
    }
    protected areSame(left: Token, right: Token): boolean {
        return left.type === right.type;
    }
    protected get(index: number): Token {
        throw new Error("Method not implemented.");
    }
    protected slice(start: number, end: number): Token[] {
        throw new Error("Method not implemented.");
    }
}

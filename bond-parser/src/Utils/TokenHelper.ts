import ArrayHelper from "./ArrayHelper";
import { Token, TokenType } from "src/Lexical";
import { Syntax } from "src/Syntax";

export default class TokenHelper extends ArrayHelper<Token, Token[], TokenType> {
    protected get length() {
        return this.tokens.length;
    }
    protected get defaultSegmentStopGroups() {
        return [[

        ]];
    }
    private readonly tokens: Token[];
    public constructor(tokens: Token[], segmentStop: TokenType[]) {
        super(segmentStop);
        this.tokens = tokens;
    }

    protected getSegmentStop(el: Token): TokenType {
        return el.type;
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

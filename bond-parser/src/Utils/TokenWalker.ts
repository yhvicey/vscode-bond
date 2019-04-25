import ArrayWalker from "./ArrayWalker";
import { Token, TokenType } from "../Lexical";

export default class TokenWalker extends ArrayWalker<Token, Token[], TokenType> {
    protected get length() {
        return this.tokens.length;
    }

    protected get defaultSegmentStopGroups() {
        return [[
            TokenType.EndOfLineToken,
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
        return this.tokens[index];
    }

    protected slice(start: number, end: number): Token[] {
        return this.tokens.slice(start, end);
    }
}

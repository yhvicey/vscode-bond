import Token, { TokenType } from "./Token";

export default class EndOfLineToken extends Token {
    public endOfLineLiteral: string;

    public constructor(start: number, endOfLineLiteral: string) {
        super(start, endOfLineLiteral.length, TokenType.EndOfLineToken);
        this.endOfLineLiteral = endOfLineLiteral;
    }
}

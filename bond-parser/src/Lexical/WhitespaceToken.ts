import Token, { TokenType } from "./Token";

export default class WhitespaceToken extends Token {
    public whitespaceLiteral: string;

    public constructor(start: number, whitespaceLiteral: string) {
        super(start, whitespaceLiteral.length, TokenType.WhitespaceToken);
        this.whitespaceLiteral = whitespaceLiteral;
    }
}

import Token, { TokenType } from "./Token";

export default class GreaterThanToken extends Token {
    public static readonly Raw = ">";

    public constructor(start: number) {
        super(start, GreaterThanToken.Raw.length, TokenType.GreaterThanToken);
    }
}

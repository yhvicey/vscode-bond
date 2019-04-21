import Token, { TokenType } from "./Token";

export default class LessThanToken extends Token {
    public static readonly Raw = "<";

    public constructor(start: number) {
        super(start, LessThanToken.Raw.length, TokenType.LessThanToken);
    }
}

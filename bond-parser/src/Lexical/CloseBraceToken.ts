import Token, { TokenType } from "./Token";

export default class CloseBraceToken extends Token {
    public static readonly Raw = "}";

    public constructor(start: number) {
        super(start, CloseBraceToken.Raw.length, TokenType.CloseBraceToken);
    }
}

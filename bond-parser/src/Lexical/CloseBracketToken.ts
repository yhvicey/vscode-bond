import Token, { TokenType } from "./Token";

export default class CloseBracketToken extends Token {
    public static readonly Raw = "]";

    public constructor(start: number) {
        super(start, CloseBracketToken.Raw.length, TokenType.CloseBracketToken);
    }
}

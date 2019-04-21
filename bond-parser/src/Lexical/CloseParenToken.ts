import Token, { TokenType } from "./Token";

export default class CloseParenToken extends Token {
    public static readonly Raw = ")";

    public constructor(start: number) {
        super(start, CloseParenToken.Raw.length, TokenType.CloseParenToken);
    }
}

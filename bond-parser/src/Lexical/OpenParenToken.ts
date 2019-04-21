import Token, { TokenType } from "./Token";

export default class OpenParenToken extends Token {
    public static readonly Raw: string = "(";

    public constructor(start: number) {
        super(start, OpenParenToken.Raw.length, TokenType.OpenParenToken);
    }
}

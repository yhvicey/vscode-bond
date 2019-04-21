import Token, { TokenType } from "./Token";

export default class EqualsToken extends Token {
    public static readonly Raw: string = "=";

    public constructor(start: number) {
        super(start, EqualsToken.Raw.length, TokenType.EqualsToken);
    }
}

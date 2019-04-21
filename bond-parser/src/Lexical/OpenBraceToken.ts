import Token, { TokenType } from "./Token";

export default class OpenBraceToken extends Token {
    public static readonly Raw: string = "{";

    public constructor(start: number) {
        super(start, OpenBraceToken.Raw.length, TokenType.OpenBraceToken);
    }
}

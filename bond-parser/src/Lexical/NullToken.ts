import Token, { TokenType } from "./Token";

export default class NullToken extends Token {
    public static readonly Raw: string = "null";

    public constructor(start: number) {
        super(start, NullToken.Raw.length, TokenType.NullToken);
    }
}

import Token, { TokenType } from "./Token";

export default class ColonToken extends Token {
    public static readonly Raw: string = ":";

    public constructor(start: number) {
        super(start, ColonToken.Raw.length, TokenType.ColonToken);
    }
}

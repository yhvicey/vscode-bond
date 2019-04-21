import Token, { TokenType } from "./Token";

export default class DotToken extends Token {
    public static readonly Raw: string = ".";

    public constructor(start: number) {
        super(start, DotToken.Raw.length, TokenType.DotToken);
    }
}

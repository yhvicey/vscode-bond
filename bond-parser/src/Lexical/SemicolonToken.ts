import Token, { TokenType } from "./Token";

export default class SemicolonToken extends Token {
    public static readonly Raw: string = ";";

    public constructor(start: number) {
        super(start, SemicolonToken.Raw.length, TokenType.SemicolonToken);
    }
}

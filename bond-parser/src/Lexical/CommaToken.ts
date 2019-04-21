import Token, { TokenType } from "./Token";

export default class CommaToken extends Token {
    public static readonly Raw: string = ",";

    public constructor(start: number) {
        super(start, CommaToken.Raw.length, TokenType.CommaToken);
    }
}

import Token, { TokenType } from "./Token";

export default class OptionalKeywordToken extends Token {
    public static readonly Raw: string = "optional";

    public constructor(start: number) {
        super(start, OptionalKeywordToken.Raw.length, TokenType.OptionalKeywordToken);
    }
}

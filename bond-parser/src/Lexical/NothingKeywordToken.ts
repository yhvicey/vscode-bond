import Token, { TokenType } from "./Token";

export default class NothingKeywordToken extends Token {
    public static readonly Raw: string = "nothing";

    public constructor(start: number) {
        super(start, NothingKeywordToken.Raw.length, TokenType.NothingKeywordToken);
    }
}

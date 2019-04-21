import Token, { TokenType } from "./Token";

export default class StructKeywordToken extends Token {
    public static readonly Raw: string = "struct";

    public constructor(start: number) {
        super(start, StructKeywordToken.Raw.length, TokenType.StructKeywordToken);
    }
}

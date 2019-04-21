import Token, { TokenType } from "./Token";

export default class EnumKeywordToken extends Token {
    public static readonly Raw: string = "enum";

    public constructor(start: number) {
        super(start, EnumKeywordToken.Raw.length, TokenType.EnumKeywordToken);
    }
}

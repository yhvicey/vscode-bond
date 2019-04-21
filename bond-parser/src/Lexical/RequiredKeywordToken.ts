import Token, { TokenType } from "./Token";

export default class RequiredKeywordToken extends Token {
    public static readonly Raw: string = "required";

    public constructor(start: number) {
        super(start, RequiredKeywordToken.Raw.length, TokenType.RequiredKeywordToken);
    }
}

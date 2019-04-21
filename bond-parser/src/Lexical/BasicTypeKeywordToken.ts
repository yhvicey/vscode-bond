import Token, { TokenType } from "./Token";

export default class BasicTypeKeywordToken extends Token {
    public keyword: string;

    public constructor(start: number, keyword: string) {
        super(start, keyword.length, TokenType.BasicTypeKeywordToken);
        this.keyword = keyword;
    }
}

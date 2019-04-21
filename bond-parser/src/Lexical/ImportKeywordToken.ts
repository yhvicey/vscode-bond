import Token, { TokenType } from "./Token";

export default class ImportKeywordToken extends Token {
    public static readonly Raw: string = "import";

    public constructor(start: number) {
        super(start, ImportKeywordToken.Raw.length, TokenType.ImportKeywordToken);
    }
}

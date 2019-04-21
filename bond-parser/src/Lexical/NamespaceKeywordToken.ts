import Token, { TokenType } from "./Token";

export default class NamespaceKeywordToken extends Token {
    public static readonly Raw: string = "namespace";

    public constructor(start: number) {
        super(start, NamespaceKeywordToken.Raw.length, TokenType.NamespaceKeywordToken);
    }
}

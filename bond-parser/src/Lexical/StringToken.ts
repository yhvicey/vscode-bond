import Token, { TokenType } from "./Token";

export default class StringToken extends Token {
    public stringLiteral: string;

    public constructor(start: number, stringLiteral: string) {
        super(start, stringLiteral.length, TokenType.StringToken);
        // Trim double quote
        this.stringLiteral = stringLiteral.substr(1, stringLiteral.length - 2);
    }
}

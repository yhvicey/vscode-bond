import Token, { TokenType } from "./Token";

export default class StringToken extends Token {
    public stringLiteral: string;

    public constructor(start: number, stringLiteral: string) {
        super(start, stringLiteral.length, TokenType.StringToken);
        this.stringLiteral = stringLiteral;
    }
}

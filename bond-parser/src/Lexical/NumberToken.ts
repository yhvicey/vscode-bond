import Token, { TokenType } from "./Token";

export default class NumberToken extends Token {
    public numberLiteral: string;

    public constructor(start: number, numberLiteral: string) {
        super(start, numberLiteral.length, TokenType.NumberToken);
        this.numberLiteral = numberLiteral;
    }
}

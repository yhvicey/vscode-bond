import Token, { TokenType } from "./Token";

export default class BooleanToken extends Token {
    public booleanLiteral: string;

    public constructor(start: number, booleanLiteral: string) {
        super(start, booleanLiteral.length, TokenType.BooleanToken);
        this.booleanLiteral = booleanLiteral;
    }
}

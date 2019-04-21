import Token, { TokenType } from "./Token";

export default class UnknownToken extends Token {
    public unknownLiteral: string;

    public constructor(start: number, unknownLiteral: string) {
        super(start, unknownLiteral.length, TokenType.UnknownToken);
        this.unknownLiteral = unknownLiteral;
    }
}

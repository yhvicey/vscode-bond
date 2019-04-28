import Token, { TokenType } from "./Token";

export default class EndOfFileToken extends Token {
    public constructor(start: number) {
        super(start, 0, TokenType.EndOfFileToken);
    }
}

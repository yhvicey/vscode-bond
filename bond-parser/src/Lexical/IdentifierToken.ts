import Token, { TokenType } from "./Token";

export default class IdentifierToken extends Token {
    public identifier: string;

    public constructor(start: number, identifier: string) {
        super(start, identifier.length, TokenType.IdentifierToken);
        this.identifier = identifier;
    }
}

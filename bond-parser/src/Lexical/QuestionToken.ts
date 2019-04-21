import Token, { TokenType } from "./Token";

export default class QuestionToken extends Token {
    public static readonly Raw: string = "?";

    public constructor(start: number) {
        super(start, QuestionToken.Raw.length, TokenType.QuestionToken);
    }
}

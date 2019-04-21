import Token, { TokenType } from "./Token";

export default class SingleLineCommentToken extends Token {
    public singleLineCommentLiteral: string;

    public constructor(start: number, singleLineCommentLiteral: string) {
        super(start, singleLineCommentLiteral.length, TokenType.SingleLineCommentToken);
        this.singleLineCommentLiteral = singleLineCommentLiteral;
    }
}

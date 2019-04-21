import Token, { TokenType } from "./Token";

export default class MultiLineCommentToken extends Token {
    public multiLineCommentTokenLiteral: string;

    public constructor(start: number, multiLineCommentTokenLiteral: string) {
        super(start, multiLineCommentTokenLiteral.length, TokenType.MultiLineCommentToken);
        this.multiLineCommentTokenLiteral = multiLineCommentTokenLiteral;
    }
}

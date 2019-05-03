import { Token, TokenType, IdentifierToken, DotToken } from "../Lexical";

export default class TokenHelper {
    public static composeIdentifiers(tokens: Token[]) {
        const segments = [];
        for (const token of tokens) {
            switch (token.type) {
                case TokenType.IdentifierToken: {
                    segments.push((token as IdentifierToken).identifier);
                    break;
                }
                case TokenType.DotToken: {
                    segments.push(DotToken.Raw);
                    break;
                }
                default: {
                    // Invalid
                    return "";
                }
            }
        }
        return segments.join("");
    }

    public static indexOf(
        tokens: Token[],
        predict: (token: Token) => boolean,
        startsFrom: number = 0) {
        startsFrom = startsFrom < 0 ? 0 : startsFrom;
        if (startsFrom >= tokens.length) {
            return -1;
        }
        for (let i = startsFrom; i < tokens.length; i++) {
            if (predict(tokens[i])) {
                return i;
            }
        }
        return -1;
    }

    public static isTriviaToken(token: Token) {
        return token.type === TokenType.WhitespaceToken
            || token.type === TokenType.EndOfLineToken
            || token.type === TokenType.MultiLineCommentToken
            || token.type === TokenType.SingleLineCommentToken;
    }

    public static purify(tokens: Token[]) {
        const purifiedTokens: Token[] = [];
        for (const token of tokens) {
            if (!TokenHelper.isTriviaToken(token)) {
                purifiedTokens.push(token);
            }
        }
        return purifiedTokens;
    }
}

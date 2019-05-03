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
        return segments.join();
    }

    public static indexOf(tokens: Token[], predict: (token: Token) => boolean) {
        for (let i = 0; i < tokens.length; i++) {
            if (predict(tokens[i])) {
                return i;
            }
        }
        return -1;
    }
}

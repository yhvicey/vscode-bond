import {
    // Basic
    Token,
    // Tokens
    BasicTypeKeywordToken,
    BooleanToken,
    CloseBraceToken,
    CloseBracketToken,
    CloseParenToken,
    ColonToken,
    CommaToken,
    DotToken,
    EndOfLineToken,
    EnumKeywordToken,
    EqualsToken,
    GreaterThanToken,
    IdentifierToken,
    ImportKeywordToken,
    LessThanToken,
    MultiLineCommentToken,
    NamespaceKeywordToken,
    NothingKeywordToken,
    NullToken,
    NumberToken,
    OpenBraceToken,
    OpenBracketToken,
    OpenParenToken,
    OptionalKeywordToken,
    QuestionToken,
    RequiredKeywordToken,
    SemicolonToken,
    SingleLineCommentToken,
    StringToken,
    StructKeywordToken,
    UnknownToken,
    WhitespaceToken,
} from "./Lexical";
import { DocSegmentHelper, DocumentWalker } from "./Utils";

export default class Lexer {
    private readonly docHelper: DocumentWalker;

    public constructor(document: string) {
        this.docHelper = new DocumentWalker(
            document,
            [
                ".", ",",
                ":", ";",
                "=", "?",
                "<", ">",
                "{", "}",
                "[", "]",
                "(", ")",
            ]);
    }

    public process(): Token[] {
        const tokens: Token[] = [];
        let token = this.nextToken();
        while (token !== null) {
            tokens.push(token);
            token = this.nextToken();
        }
        return tokens;
    }

    private nextToken(): Token | null {
        let token: Token | null = null;
        if (!this.docHelper.advanceToNextSegmentStart()) {
            return token;
        } else {
            const segment = this.docHelper.segment;
            if (DocSegmentHelper.isWhitespace(segment)) {
                token = new WhitespaceToken(this.docHelper.start, segment);
            } else if (DocSegmentHelper.isBasicType(segment)) {
                token = new BasicTypeKeywordToken(this.docHelper.start, segment);
            } else if (DocSegmentHelper.isNumber(segment)) {
                token = new NumberToken(this.docHelper.start, segment);
            } else if (DocSegmentHelper.isKeyword(segment)) {
                switch (segment) {
                    case "enum":
                        token = new EnumKeywordToken(this.docHelper.start); break;
                    case "import":
                        token = new ImportKeywordToken(this.docHelper.start); break;
                    case "namespace":
                        token = new NamespaceKeywordToken(this.docHelper.start); break;
                    case "optional":
                        token = new OptionalKeywordToken(this.docHelper.start); break;
                    case "required":
                        token = new RequiredKeywordToken(this.docHelper.start); break;
                    case "struct":
                        token = new StructKeywordToken(this.docHelper.start); break;
                    default:
                        throw new Error("Invalid keyword " + segment);
                }
            } else if (DocSegmentHelper.isValue(segment)) {
                switch (segment) {
                    case "false":
                        token = new BooleanToken(this.docHelper.start, segment); break;
                    case "nothing":
                        token = new NothingKeywordToken(this.docHelper.start); break;
                    case "null":
                        token = new NullToken(this.docHelper.start); break;
                    case "true":
                        token = new BooleanToken(this.docHelper.start, segment); break;
                    default:
                        throw new Error("Invalid value " + segment);
                }
            } else if (DocSegmentHelper.isBasicType(segment)) {
                token = new BasicTypeKeywordToken(this.docHelper.start, segment);
            } else if (DocSegmentHelper.isOpenBrace(segment)) {
                token = new OpenBraceToken(this.docHelper.start);
            } else if (DocSegmentHelper.isOpenBracket(segment)) {
                token = new OpenBracketToken(this.docHelper.start);
            } else if (DocSegmentHelper.isOpenParen(segment)) {
                token = new OpenParenToken(this.docHelper.start);
            } else if (DocSegmentHelper.isCloseBrace(segment)) {
                token = new CloseBraceToken(this.docHelper.start);
            } else if (DocSegmentHelper.isCloseBracket(segment)) {
                token = new CloseBracketToken(this.docHelper.start);
            } else if (DocSegmentHelper.isCloseParen(segment)) {
                token = new CloseParenToken(this.docHelper.start);
            } else if (DocSegmentHelper.isLessThan(segment)) {
                token = new LessThanToken(this.docHelper.start);
            } else if (DocSegmentHelper.isGreaterThan(segment)) {
                token = new GreaterThanToken(this.docHelper.start);
            } else if (DocSegmentHelper.isComma(segment)) {
                token = new CommaToken(this.docHelper.start);
            } else if (DocSegmentHelper.isColon(segment)) {
                token = new ColonToken(this.docHelper.start);
            } else if (DocSegmentHelper.isDot(segment)) {
                token = new DotToken(this.docHelper.start);
            } else if (DocSegmentHelper.isEquals(segment)) {
                token = new EqualsToken(this.docHelper.start);
            } else if (DocSegmentHelper.isQuestion(segment)) {
                token = new QuestionToken(this.docHelper.start);
            } else if (DocSegmentHelper.isSemicolon(segment)) {
                token = new SemicolonToken(this.docHelper.start);
            } else if (DocSegmentHelper.isEndOfLine(segment)) {
                token = new EndOfLineToken(this.docHelper.start, segment);
            } else if (DocSegmentHelper.isSingleLineCommentStart(segment)) {
                const nextSegmentStart = this.docHelper.nextIndexOf(char => char === "\r" || char === "\n");
                this.docHelper.advanceTo(nextSegmentStart);
                token = new SingleLineCommentToken(this.docHelper.start, this.docHelper.segment);
            } else if (DocSegmentHelper.isMultipleLineCommentStart(segment)) {
                while (true) {
                    const nextStartIndex = this.docHelper.nextIndexOf(char => char === "*");
                    if (!this.docHelper.advanceTo(nextStartIndex) || this.docHelper.next === "") {
                        // Can't find end of the multiple line comment, return all of them
                        token = new MultiLineCommentToken(this.docHelper.start, this.docHelper.segment);
                        break;
                    } else if (this.docHelper.next === "/") {
                        this.docHelper.advance(2);
                        token = new MultiLineCommentToken(this.docHelper.start, this.docHelper.segment);
                        break;
                    }
                }
            } else if (DocSegmentHelper.isStringLiteralStart(segment)) {
                if (segment.length > 1 && !segment.endsWith("\\\"") && segment.endsWith("\"")) {
                    token = new StringToken(this.docHelper.start, segment);
                } else {
                    while (true) {
                        const nextQuoteIndex = this.docHelper.nextIndexOf(char => char === "\"");
                        if (!this.docHelper.advanceTo(nextQuoteIndex)) {
                            // Can't find end of the string literal, return all of them
                            token = new StringToken(this.docHelper.start, this.docHelper.segment);
                            break;
                        } else if (this.docHelper.prev !== "\\") {
                            this.docHelper.advance();
                            token = new StringToken(this.docHelper.start, this.docHelper.segment);
                            break;
                        }
                    }
                }
            } else if (DocSegmentHelper.isIdentifier(segment)) {
                token = new IdentifierToken(this.docHelper.start, this.docHelper.segment);
            } else {
                token = new UnknownToken(this.docHelper.start, segment);
            }
        }
        this.docHelper.commit();
        return token;
    }
}

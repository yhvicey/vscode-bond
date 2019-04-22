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
import { DocumentReader, SegmentHelper } from "./Utils";

export default class Lexer {
    private readonly reader: DocumentReader;

    public constructor(document: string) {
        this.reader = new DocumentReader(
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
        if (!this.reader.advanceToNextSegmentStart()) {
            return token;
        } else {
            const segment = this.reader.segment;
            if (SegmentHelper.isWhitespace(segment)) {
                token = new WhitespaceToken(this.reader.start, segment);
            } else if (SegmentHelper.isBasicType(segment)) {
                token = new BasicTypeKeywordToken(this.reader.start, segment);
            } else if (SegmentHelper.isNumber(segment)) {
                token = new NumberToken(this.reader.start, segment);
            } else if (SegmentHelper.isKeyword(segment)) {
                switch (segment) {
                    case "enum":
                        token = new EnumKeywordToken(this.reader.start); break;
                    case "import":
                        token = new ImportKeywordToken(this.reader.start); break;
                    case "namespace":
                        token = new NamespaceKeywordToken(this.reader.start); break;
                    case "optional":
                        token = new OptionalKeywordToken(this.reader.start); break;
                    case "required":
                        token = new RequiredKeywordToken(this.reader.start); break;
                    case "struct":
                        token = new StructKeywordToken(this.reader.start); break;
                    default:
                        throw new Error("Invalid keyword " + segment);
                }
            } else if (SegmentHelper.isValue(segment)) {
                switch (segment) {
                    case "false":
                        token = new BooleanToken(this.reader.start, segment); break;
                    case "nothing":
                        token = new NothingKeywordToken(this.reader.start); break;
                    case "null":
                        token = new NullToken(this.reader.start); break;
                    case "true":
                        token = new BooleanToken(this.reader.start, segment); break;
                    default:
                        throw new Error("Invalid value " + segment);
                }
            } else if (SegmentHelper.isBasicType(segment)) {
                token = new BasicTypeKeywordToken(this.reader.start, segment);
            } else if (SegmentHelper.isOpenBrace(segment)) {
                token = new OpenBraceToken(this.reader.start);
            } else if (SegmentHelper.isOpenBracket(segment)) {
                token = new OpenBracketToken(this.reader.start);
            } else if (SegmentHelper.isOpenParen(segment)) {
                token = new OpenParenToken(this.reader.start);
            } else if (SegmentHelper.isCloseBrace(segment)) {
                token = new CloseBraceToken(this.reader.start);
            } else if (SegmentHelper.isCloseBracket(segment)) {
                token = new CloseBracketToken(this.reader.start);
            } else if (SegmentHelper.isCloseParen(segment)) {
                token = new CloseParenToken(this.reader.start);
            } else if (SegmentHelper.isLessThan(segment)) {
                token = new LessThanToken(this.reader.start);
            } else if (SegmentHelper.isGreaterThan(segment)) {
                token = new GreaterThanToken(this.reader.start);
            } else if (SegmentHelper.isComma(segment)) {
                token = new CommaToken(this.reader.start);
            } else if (SegmentHelper.isColon(segment)) {
                token = new ColonToken(this.reader.start);
            } else if (SegmentHelper.isDot(segment)) {
                token = new DotToken(this.reader.start);
            } else if (SegmentHelper.isEquals(segment)) {
                token = new EqualsToken(this.reader.start);
            } else if (SegmentHelper.isQuestion(segment)) {
                token = new QuestionToken(this.reader.start);
            } else if (SegmentHelper.isSemicolon(segment)) {
                token = new SemicolonToken(this.reader.start);
            } else if (SegmentHelper.isEndOfLine(segment)) {
                token = new EndOfLineToken(this.reader.start, segment);
            } else if (SegmentHelper.isSingleLineCommentStart(segment)) {
                const nextSegmentStart = this.reader.nextIndexOf(char => char === "\r" || char === "\n");
                this.reader.advanceTo(nextSegmentStart);
                token = new SingleLineCommentToken(this.reader.start, this.reader.segment);
            } else if (SegmentHelper.isMultipleLineCommentStart(segment)) {
                while (true) {
                    const nextStartIndex = this.reader.nextIndexOf(char => char === "*");
                    if (!this.reader.advanceTo(nextStartIndex) || this.reader.next === "") {
                        // Can't find end of the multiple line comment, return all of them
                        token = new MultiLineCommentToken(this.reader.start, this.reader.segment);
                        break;
                    } else if (this.reader.next === "/") {
                        this.reader.advance(2);
                        token = new MultiLineCommentToken(this.reader.start, this.reader.segment);
                        break;
                    }
                }
            } else if (SegmentHelper.isStringLiteralStart(segment)) {
                if (segment.length > 1 && !segment.endsWith("\\\"") && segment.endsWith("\"")) {
                    token = new StringToken(this.reader.start, segment);
                } else {
                    while (true) {
                        const nextQuoteIndex = this.reader.nextIndexOf(char => char === "\"");
                        if (!this.reader.advanceTo(nextQuoteIndex)) {
                            // Can't find end of the string literal, return all of them
                            token = new StringToken(this.reader.start, this.reader.segment);
                            break;
                        } else if (this.reader.prev !== "\\") {
                            this.reader.advance();
                            token = new StringToken(this.reader.start, this.reader.segment);
                            break;
                        }
                    }
                }
            } else if (SegmentHelper.isIdentifier(segment)) {
                token = new IdentifierToken(this.reader.start, this.reader.segment);
            } else {
                token = new UnknownToken(this.reader.start, segment);
            }
        }
        this.reader.commit();
        return token;
    }
}

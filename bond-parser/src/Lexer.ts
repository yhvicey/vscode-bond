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
    EndOfFileToken,
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
    private readonly docWalker: DocumentWalker;

    public constructor(document: string) {
        this.docWalker = new DocumentWalker(
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
        tokens.push(new EndOfFileToken(this.docWalker.length));
        return tokens;
    }

    private nextToken(): Token | null {
        let token: Token | null = null;
        if (!this.docWalker.advanceToNextSegmentStart()) {
            return token;
        } else {
            const segment = this.docWalker.segment;
            if (DocSegmentHelper.isWhitespace(segment)) {
                token = new WhitespaceToken(this.docWalker.start, segment);
            } else if (DocSegmentHelper.isBasicType(segment)) {
                token = new BasicTypeKeywordToken(this.docWalker.start, segment);
            } else if (DocSegmentHelper.isNumber(segment)) {
                token = new NumberToken(this.docWalker.start, segment);
            } else if (DocSegmentHelper.isKeyword(segment)) {
                switch (segment) {
                    case "enum":
                        token = new EnumKeywordToken(this.docWalker.start); break;
                    case "import":
                        token = new ImportKeywordToken(this.docWalker.start); break;
                    case "namespace":
                        token = new NamespaceKeywordToken(this.docWalker.start); break;
                    case "optional":
                        token = new OptionalKeywordToken(this.docWalker.start); break;
                    case "required":
                        token = new RequiredKeywordToken(this.docWalker.start); break;
                    case "struct":
                        token = new StructKeywordToken(this.docWalker.start); break;
                    default:
                        throw new Error("Invalid keyword " + segment);
                }
            } else if (DocSegmentHelper.isValue(segment)) {
                switch (segment) {
                    case "false":
                        token = new BooleanToken(this.docWalker.start, segment); break;
                    case "nothing":
                        token = new NothingKeywordToken(this.docWalker.start); break;
                    case "null":
                        token = new NullToken(this.docWalker.start); break;
                    case "true":
                        token = new BooleanToken(this.docWalker.start, segment); break;
                    default:
                        throw new Error("Invalid value " + segment);
                }
            } else if (DocSegmentHelper.isBasicType(segment)) {
                token = new BasicTypeKeywordToken(this.docWalker.start, segment);
            } else if (DocSegmentHelper.isOpenBrace(segment)) {
                token = new OpenBraceToken(this.docWalker.start);
            } else if (DocSegmentHelper.isOpenBracket(segment)) {
                token = new OpenBracketToken(this.docWalker.start);
            } else if (DocSegmentHelper.isOpenParen(segment)) {
                token = new OpenParenToken(this.docWalker.start);
            } else if (DocSegmentHelper.isCloseBrace(segment)) {
                token = new CloseBraceToken(this.docWalker.start);
            } else if (DocSegmentHelper.isCloseBracket(segment)) {
                token = new CloseBracketToken(this.docWalker.start);
            } else if (DocSegmentHelper.isCloseParen(segment)) {
                token = new CloseParenToken(this.docWalker.start);
            } else if (DocSegmentHelper.isLessThan(segment)) {
                token = new LessThanToken(this.docWalker.start);
            } else if (DocSegmentHelper.isGreaterThan(segment)) {
                token = new GreaterThanToken(this.docWalker.start);
            } else if (DocSegmentHelper.isComma(segment)) {
                token = new CommaToken(this.docWalker.start);
            } else if (DocSegmentHelper.isColon(segment)) {
                token = new ColonToken(this.docWalker.start);
            } else if (DocSegmentHelper.isDot(segment)) {
                token = new DotToken(this.docWalker.start);
            } else if (DocSegmentHelper.isEquals(segment)) {
                token = new EqualsToken(this.docWalker.start);
            } else if (DocSegmentHelper.isQuestion(segment)) {
                token = new QuestionToken(this.docWalker.start);
            } else if (DocSegmentHelper.isSemicolon(segment)) {
                token = new SemicolonToken(this.docWalker.start);
            } else if (DocSegmentHelper.isEndOfLine(segment)) {
                token = new EndOfLineToken(this.docWalker.start, segment);
            } else if (DocSegmentHelper.isSingleLineCommentStart(segment)) {
                const nextSegmentStart = this.docWalker.nextIndexOf(char => char === "\r" || char === "\n");
                this.docWalker.advanceTo(nextSegmentStart);
                token = new SingleLineCommentToken(this.docWalker.start, this.docWalker.segment);
            } else if (DocSegmentHelper.isMultipleLineCommentStart(segment)) {
                while (true) {
                    const nextStartIndex = this.docWalker.nextIndexOf(char => char === "*");
                    if (!this.docWalker.advanceTo(nextStartIndex) || this.docWalker.next === "") {
                        // Can't find end of the multiple line comment, return all of them
                        token = new MultiLineCommentToken(this.docWalker.start, this.docWalker.segment);
                        break;
                    } else if (this.docWalker.next === "/") {
                        this.docWalker.advance(2);
                        token = new MultiLineCommentToken(this.docWalker.start, this.docWalker.segment);
                        break;
                    }
                }
            } else if (DocSegmentHelper.isStringLiteralStart(segment)) {
                if (segment.length > 1 && !segment.endsWith("\\\"") && segment.endsWith("\"")) {
                    token = new StringToken(this.docWalker.start, segment);
                } else {
                    while (true) {
                        const nextQuoteIndex = this.docWalker.nextIndexOf(char => char === "\"");
                        if (!this.docWalker.advanceTo(nextQuoteIndex)) {
                            // Can't find end of the string literal, return all of them
                            token = new StringToken(this.docWalker.start, this.docWalker.segment);
                            break;
                        } else if (this.docWalker.prev !== "\\") {
                            this.docWalker.advance();
                            token = new StringToken(this.docWalker.start, this.docWalker.segment);
                            break;
                        }
                    }
                }
            } else if (DocSegmentHelper.isIdentifier(segment)) {
                token = new IdentifierToken(this.docWalker.start, this.docWalker.segment);
            } else {
                token = new UnknownToken(this.docWalker.start, segment);
            }
        }
        this.docWalker.commit();
        return token;
    }
}

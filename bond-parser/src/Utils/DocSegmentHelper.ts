import {
    CloseBraceToken,
    CloseBracketToken,
    CloseParenToken,
    ColonToken,
    CommaToken,
    DotToken,
    EqualsToken,
    GreaterThanToken,
    LessThanToken,
    OpenBraceToken,
    OpenBracketToken,
    OpenParenToken,
    QuestionToken,
    SemicolonToken,
} from "../Lexical";

export default class DocSegmentHelper {
    public static isBasicType(segment: string) {
        return this.basicTypes.indexOf(segment) !== -1;
    }

    public static isCloseBrace(segment: string) {
        return segment === CloseBraceToken.Raw;
    }

    public static isCloseBracket(segment: string) {
        return segment === CloseBracketToken.Raw;
    }

    public static isCloseParen(segment: string) {
        return segment === CloseParenToken.Raw;
    }

    public static isColon(segment: string) {
        return segment === ColonToken.Raw;
    }

    public static isComma(segment: string) {
        return segment === CommaToken.Raw;
    }

    public static isDot(segment: string) {
        return segment === DotToken.Raw;
    }

    public static isEndOfLine(segment: string) {
        return this.endOfLineRegex.test(segment);
    }

    public static isEquals(segment: string) {
        return segment === EqualsToken.Raw;
    }

    public static isGreaterThan(segment: string) {
        return segment === GreaterThanToken.Raw;
    }

    public static isIdentifier(segment: string) {
        return this.identifierRegex.test(segment);
    }

    public static isKeyword(segment: string) {
        return this.keywordRegex.test(segment);
    }

    public static isLessThan(segment: string) {
        return segment === LessThanToken.Raw;
    }

    public static isMultipleLineCommentStart(segment: string) {
        return segment.startsWith("/*");
    }

    public static isNumber(segment: string) {
        return this.numberRegex.test(segment);
    }

    public static isOpenBrace(segment: string) {
        return segment === OpenBraceToken.Raw;
    }

    public static isOpenBracket(segment: string) {
        return segment === OpenBracketToken.Raw;
    }

    public static isOpenParen(segment: string) {
        return segment === OpenParenToken.Raw;
    }

    public static isQuestion(segment: string) {
        return segment === QuestionToken.Raw;
    }

    public static isSemicolon(segment: string) {
        return segment === SemicolonToken.Raw;
    }

    public static isSingleLineCommentStart(segment: string) {
        return segment.startsWith("//") || segment.startsWith("#"); // Is "#" a valid bond comment start?
    }

    public static isStringLiteralStart(segment: string) {
        return this.stringLiteralStartRegex.test(segment);
    }

    public static isValue(segment: string) {
        return this.valueRegex.test(segment);
    }

    public static isWhitespace(segment: string) {
        return this.whitespaceRegex.test(segment);
    }

    private static readonly basicTypes = [
        "bool",
        "byte",
        "char",
        "decimal",
        "double",
        "float",
        "int",
        "int8",
        "int16",
        "int32",
        "int64",
        "list",
        "long",
        "map",
        "nullable",
        "object",
        "sbyte",
        "short",
        "string",
        "uint",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "ulong",
        "ushort",
        "vector",
        "wstring"];
    private static readonly endOfLineRegex = /^(\r|\n)+$/;
    private static readonly identifierRegex = /^\w+$/;
    private static readonly keywordRegex = /^(enum|import|namespace|optional|required|struct)$/;
    private static readonly numberRegex = /^(?<!\.)(-)?(\d+)((\.(\d+))|(l|L))?(?!\.)$/;
    private static readonly stringLiteralStartRegex = /(L)?"/;
    private static readonly valueRegex = /^(false|nothing|null|true)$/;
    private static readonly whitespaceRegex = /^( |\t|\u00a0)+$/;
}

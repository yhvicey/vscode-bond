import TextSpan from "../Document/TextSpan";

export enum TokenType {
    UnknownToken,
    // Keywords
    BasicTypeKeywordToken,
    EnumKeywordToken,
    ImportKeywordToken,
    NamespaceKeywordToken,
    OptionalKeywordToken,
    RequiredKeywordToken,
    StructKeywordToken,
    // Values
    BooleanToken,
    NothingKeywordToken,
    NullToken,
    NumberToken,
    StringToken,
    // Naming
    DotToken,
    IdentifierToken,
    // Pairs
    CloseBraceToken,
    CloseBracketToken,
    CloseParenToken,
    OpenBraceToken,
    OpenBracketToken,
    OpenParenToken,
    // Misc
    ColonToken,
    CommaToken,
    EqualsToken,
    GreaterThanToken,
    LessThanToken,
    QuestionToken,
    SemicolonToken,
    // Trivia
    WhitespaceToken,
    EndOfLineToken,
    SingleLineCommentToken,
    MultiLineCommentToken,
}

export default abstract class Token extends TextSpan {
    public type: TokenType;

    public constructor(start: number, length: number, type: TokenType) {
        super(start, length);
        this.type = type;
    }
}

import ParserBase from "./ParserBase";
import { Token, TokenType } from "../Lexical";

export default class ScriptParser extends ParserBase {
    protected getStopTokenTypes(): TokenType[] {
        throw new Error("Method not implemented.");
    }

    protected handleSegment(tokens: Token[]): import("../Syntax").Syntax {
        throw new Error("Method not implemented.");
    }
}

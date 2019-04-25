import { SyntaxType, Syntax } from "../Syntax";
import { ParserBase } from "../Parsers";

export default class ComplexSyntaxHelper {
    public static createParser(syntax: Syntax): ParserBase {
        switch (syntax.type) {

        }
        throw new Error("Not implemented yet.");
    }
}

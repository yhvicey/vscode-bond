import { SyntaxType, Syntax } from "../Syntax";
import { ParserBase } from "../Parsers";

export default class ComplexSyntaxHelper {
    public static createParser(syntax: Syntax): ParserBase<Syntax> {
        switch (syntax.type) {

        }
        throw new Error("Not implemented yet.");
    }
}

import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import Props from "../Props";

import { Lexer, Parser } from "../../src";
import { SyntaxType, Syntax } from "../../src/Syntax";

const samples = readdirSync(Props.sampleRoot);

// Options
const filter = /.*/;
const indent = "    ";

function getSyntaxString(document: string, syntax: Syntax, depth: number = 0) {
    let line = indent.repeat(depth);
    line += SyntaxType[syntax.type];
    line += "\t" + syntax.toString();
    line += "\t" + syntax
        .toRaw(document)
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t");
    if (syntax.syntaxes !== undefined) {
        for (const childSyntax of syntax.syntaxes) {
            line += "\n" + getSyntaxString(document, childSyntax, depth + 1);
        }
    }
    return line;
}

for (const sample of samples) {
    if (!filter.test(sample)) {
        continue;
    }
    const document = readFileSync(resolve(Props.sampleRoot, sample)).toString().replace(/^\uFEFF/, "");
    const lexer = new Lexer(document);
    const tokens = lexer.process();
    const parser = new Parser(tokens);
    const syntaxes = parser.parse();
    const syntaxesText = syntaxes
        .map(syntax => getSyntaxString(document, syntax))
        .filter(text => typeof text === "string") as string[];
    writeFileSync(
        resolve(Props.syntaxesRoot, `${sample}.tsv`),
        ["TokenType\tSpan\tRaw"]
            .concat(syntaxesText)
            .join("\n"));
}

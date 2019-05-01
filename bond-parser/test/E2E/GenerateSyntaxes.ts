import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import Props from "../Props";

import { Lexer, Parser } from "../../src";
import { SyntaxType, Syntax, AttributableSyntax } from "../../src/Syntax";
import ComplexSyntax from "../../src/Syntax/ComplexSyntax";

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
    if (syntax.isComplexSyntax) {
        if ((syntax as AttributableSyntax).attributes !== undefined) {
            for (const attribute of (syntax as AttributableSyntax).attributes) {
                line += "\n" + getSyntaxString(document, attribute, depth + 1);
            }
        }
        for (const childSyntax of (syntax as ComplexSyntax).syntaxes) {
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
    const script = parser.parse();
    const scriptText = getSyntaxString(document, script);
    writeFileSync(
        resolve(Props.syntaxesRoot, `${sample}.tsv`),
        ["SyntaxType\tSpan\tRaw"]
            .concat(scriptText)
            .join("\n"));
}

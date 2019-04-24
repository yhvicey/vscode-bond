import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import Props from "../Props";

import { Lexer, Parser } from "../../src";
import { SyntaxType } from "../../src/Syntax";

const samples = readdirSync(Props.sampleRoot);

// Options
const filter = /.*/;
const outputTriviaToken = false;

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
        .map(syntax => {
            let line = SyntaxType[syntax.type];
            line = line + "\t" + syntax.toString();
            line = line + "\t" + syntax
                .toRaw(document)
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t");
            return line;
        })
        .filter(text => typeof text === "string") as string[];
    writeFileSync(
        resolve(Props.syntaxesRoot, `${sample}.tsv`),
        ["TokenType\tSpan\tRaw"]
            .concat(syntaxesText)
            .join("\n"));
}

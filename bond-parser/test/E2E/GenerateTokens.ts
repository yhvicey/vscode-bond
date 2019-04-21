import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import Props from "../Props";

import Lexer from "../../src/Lexer";
import { TokenType } from "../../src/Lexical";

const samples = readdirSync(Props.sampleRoot);

samples.forEach(sample => {
    const document = readFileSync(resolve(Props.sampleRoot, sample)).toString().replace(/^\uFEFF/, "");
    const lexer = new Lexer(document);
    const tokens = lexer.process();
    const tokensText = tokens
        .map(token => {
            let line = TokenType[token.type];
            line = line + "\t" + token.toString();
            line = line + "\t" + token
                .toRaw(document)
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t");
            return line;
        });
    writeFileSync(
        resolve(Props.tokensRoot, `${sample}.tsv`),
        ["TokenType\tSpan\tRaw"].concat(tokensText).join("\n"));
});

import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import Props from "../Props";

import { Lexer } from "../../src";
import { TokenType } from "../../src/Lexical";

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
    const tokensText = tokens
        .map(token => {
            if (!outputTriviaToken
                && (token.type === TokenType.WhitespaceToken
                    || token.type === TokenType.SingleLineCommentToken
                    || token.type === TokenType.MultiLineCommentToken
                    || token.type === TokenType.EndOfLineToken)) {
                return;
            }
            let line = TokenType[token.type];
            line = line + "\t" + token.toSpanString();
            line = line + "\t" + token
                .toRaw(document)
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t");
            return line;
        })
        .filter(text => typeof text === "string") as string[];
    writeFileSync(
        resolve(Props.tokensRoot, `${sample}.tsv`),
        ["TokenType\tSpan\tRaw"]
            .concat(tokensText)
            .join("\n"));
}

import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import Props from "../Props";

import { Lexer, Parser } from "../../src";
import {
    Syntax,
    SyntaxType,
    AttributableSyntax,
    EnumSyntax,
    ImportSyntax,
    NamespaceSyntax,
} from "../../src/Syntax";
import ComplexSyntax from "../../src/Syntax/ComplexSyntax";

const samples = readdirSync(Props.sampleRoot);

// Options
const filter = /.*/;
const indent = "    ";

function getSyntaxPropsString(syntax: Syntax) {
    switch (syntax.type) {
        case SyntaxType.EnumSyntax: {
            const fields = (syntax as EnumSyntax).fields;
            if (fields !== undefined) {
                const fieldText = fields.map(field => {
                    if (field.name === undefined) {
                        return "";
                    }
                    if (field.value === undefined) {
                        return field.name;
                    }
                    return `${field.name} = ${field.value}`;
                }).join(", ");
                return `[${fieldText}]`;
            }
            break;
        }
        case SyntaxType.ImportSyntax: {
            const path = (syntax as ImportSyntax).path;
            if (path !== undefined) {
                return path;
            }
            break;
        }
        case SyntaxType.NamespaceSyntax: {
            const name = (syntax as NamespaceSyntax).name;
            if (name !== undefined) {
                return name;
            }
            break;
        }
        default: {
            return "-";
        }
    }
    return "";
}

function getSyntaxString(document: string, syntax: Syntax, depth: number = 0) {
    let line = indent.repeat(depth);
    line += SyntaxType[syntax.type];
    line += "\t" + syntax.toSpanString();
    line += "\t" + getSyntaxPropsString(syntax);
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
        ["SyntaxType\tSpan\tProps\tRaw"]
            .concat(scriptText)
            .join("\n"));
}

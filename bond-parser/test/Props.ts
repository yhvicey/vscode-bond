import * as path from "path";

const projectRoot = path.resolve(__dirname, "..", "..");
const commonRoot = path.resolve(projectRoot, "..");
const testFilesRoot = path.resolve(commonRoot, "bond-test");
const sampleRoot = path.resolve(testFilesRoot, "Samples");
const tokensRoot = path.resolve(testFilesRoot, "Tokens");

export default {
    projectRoot,
    commonRoot,
    testFilesRoot,
    sampleRoot,
    tokensRoot,
};

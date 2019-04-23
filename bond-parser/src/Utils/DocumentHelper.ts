import ArrayHelper from "./ArrayHelper";

export default class DocumentHelper extends ArrayHelper<string, string> {
    protected get length() {
        return this.document.length;
    }

    protected get defaultSegmentStopGroups() {
        return [[
            " ",
            "\t",
            "\u00a0",
        ], [
            "\r",
            "\n"
        ]];
    }

    private readonly document: string;

    public constructor(document: string, segmentStop: string[]) {
        super(segmentStop);
        this.document = document;
    }
    protected areSame(left: string, right: string): boolean {
        return left === right;
    }

    protected get(index: number) {
        return this.document.charAt(index);
    }

    protected slice(start: number, end: number): string {
        return this.document.slice(start, end);
    }
}

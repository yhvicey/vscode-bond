export default class TextSpan {
    public start: number;
    public length: number;
    public end: number;

    public constructor(start: number, length: number) {
        this.start = start;
        this.length = length;
        this.end = this.start + length;
    }

    public isWithin(position: number) {
        // Text span represents a char array [start, end)
        return position >= this.start && position < this.end;
    }

    public toString() {
        return `[${this.start}, ${this.end})`;
    }

    public toRaw(document: string) {
        return document.substring(this.start, this.end);
    }
}

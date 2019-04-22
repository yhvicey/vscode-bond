export default class DocumentReader {
    private readonly document: string;
    private currentIndex: number = 0;
    private currentCommittedIndex: number = 0;
    private segmentStop: string[];

    public get current() {
        return this.document.charAt(this.currentIndex);
    }

    public get end() {
        return this.currentIndex;
    }

    public get finished() {
        return this.currentIndex + 1 >= this.document.length;
    }

    public get next() {
        return this.document.charAt(this.currentIndex + 1);
    }

    public get prev() {
        return this.document.charAt(this.currentIndex - 1);
    }

    public get start() {
        return this.currentCommittedIndex;
    }

    public get segment() {
        return this.document.substring(this.currentCommittedIndex, this.currentIndex);
    }

    public constructor(document: string, segmentStop?: string[]) {
        this.document = document;
        this.segmentStop = segmentStop || [];
    }

    public advance(count: number = 1) {
        return this.advanceTo(this.currentIndex + count);
    }

    public advanceTo(index: number) {
        if (index <= this.currentIndex) {
            return false;
        }
        if (index > this.document.length) {
            return false;
        }
        this.currentIndex = index;
        return true;
    }

    public advanceToNextSegmentStart() {
        switch (this.current) {
            // Return whitespace segment
            case " ":
            case "\t":
            case "\u00a0": {
                const index = this.nextIndexOf(char => char !== " " && char !== "\t" && char !== "\u00a0");
                return this.advanceTo(index);
            }
            // Return newline segment
            case "\n":
            case "\r": {
                const index = this.nextIndexOf(char => char !== "\r" && char !== "\n");
                return this.advanceTo(index);
            }
            // Return a non-whitespace segment
            default: {
                // If current is a user-defined segment stop
                if (this.isUserDefinedSegmentStop(this.current)) {
                    // then advance to next index
                    return this.advance();
                } else {
                    const index = this.nextIndexOf(char => this.isSegmentStop(char));
                    return this.advanceTo(index);
                }
            }
        }
    }

    public commit() {
        this.currentCommittedIndex = this.currentIndex;
    }

    public nextIndexOf(predict: (char: string) => boolean) {
        let index = this.currentIndex;
        while (index < this.document.length) {
            if (predict(this.document.charAt(index))) {
                return index;
            }
            index++;
        }
        return index;
    }

    public reset() {
        this.currentIndex = this.currentCommittedIndex;
    }

    private isSegmentStop(char: string) {
        return char === " "
            || char === "\t"
            || char === "\u00a0"
            || char === "\r"
            || char === "\n"
            || this.isUserDefinedSegmentStop(char);
    }

    private isUserDefinedSegmentStop(char: string) {
        return this.segmentStop.indexOf(char) !== -1;
    }
}

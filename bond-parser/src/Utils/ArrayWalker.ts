export default abstract class ArrayWalker<TElement, TSegment, TSegmentStop> {
    public get current(): TElement | undefined {
        return this.get(this.currentIndex);
    }

    public get end() {
        return this.currentIndex;
    }

    public get finished() {
        return this.currentIndex + 1 >= this.length;
    }

    public get next() {
        return this.get(this.currentIndex + 1);
    }

    public get prev() {
        return this.get(this.currentIndex - 1);
    }

    public get start() {
        return this.currentCommittedIndex;
    }

    public get segment() {
        return this.slice(this.currentCommittedIndex, this.currentIndex);
    }

    public abstract get length(): number;

    protected abstract defaultSegmentStopGroups: TSegmentStop[][];

    private currentIndex: number = 0;
    private currentCommittedIndex: number = 0;
    private userDefinedSegmentStop: TSegmentStop[];

    public constructor(userDefinedSegmentStop?: TSegmentStop[]) {
        this.userDefinedSegmentStop = userDefinedSegmentStop || [];
    }

    public advance(count: number = 1) {
        return this.advanceTo(this.currentIndex + count);
    }

    public advanceTo(index: number) {
        if (index <= this.currentIndex) {
            return false;
        }
        if (index > this.length) {
            return false;
        }
        this.currentIndex = index;
        return true;
    }

    public advanceToNextSegmentStart(): boolean {
        if (this.current === undefined) {
            return false;
        }
        for (const defaultSegmentStops of this.defaultSegmentStopGroups) {
            // If current is one of the current default segment stop
            if (this.isSegmentStopElement(this.current, defaultSegmentStops)) {
                // then advance to next non current group segment stop
                const index = this.nextIndexOf(el => !this.isSegmentStopElement(el, defaultSegmentStops));
                return this.advanceTo(index);
            }
        }

        // If current is a user-defined segment stop
        if (this.isUserDefinedSegmentStop(this.current)) {
            // then advance to next index
            return this.advance();
        } else {
            const index = this.nextIndexOf(el => this.isSegmentStop(el));
            return this.advanceTo(index);
        }
    }

    public commit() {
        this.currentCommittedIndex = this.currentIndex;
    }

    public nextIndexOf(predict: (el: TElement) => boolean) {
        let index = this.currentIndex;
        while (index < this.length) {
            if (predict(this.get(index))) {
                return index;
            }
            index++;
        }
        return index;
    }

    public reset() {
        this.currentIndex = this.currentCommittedIndex;
    }

    protected abstract get(index: number): TElement;

    protected abstract getSegmentStop(el: TElement): TSegmentStop;

    protected abstract slice(start: number, end: number): TSegment;

    protected isSegmentStop(el: TElement) {
        return this.isDefaultSegmentStop(el)
            || this.isUserDefinedSegmentStop(el);
    }

    protected isDefaultSegmentStop(el: TElement) {
        return this.isSegmentStopElement(el, this.defaultSegmentStopGroups.flat());
    }

    protected isUserDefinedSegmentStop(el: TElement) {
        return this.isSegmentStopElement(el, this.userDefinedSegmentStop);
    }

    private isSegmentStopElement(el: TElement, array: TSegmentStop[]) {
        for (const e of array) {
            if (this.getSegmentStop(el) === e) {
                return true;
            }
        }
        return false;
    }
}

import { Enum, EnumField } from "./Enum";

export enum ValueKind {
    Nothing,
    Enum,
    Number,
}

export abstract class Value {
    public kind: ValueKind;

    protected constructor(kind: ValueKind) {
        this.kind = kind;
    }

    public abstract toString(): string;
}

export class NothingValue extends Value {
    public constructor() {
        super(ValueKind.Nothing);
    }

    public toString() {
        return "nothing";
    }
}

export class EnumValue extends Value {
    public constructor(value: EnumField) {
        super(ValueKind.Enum);
    }
}
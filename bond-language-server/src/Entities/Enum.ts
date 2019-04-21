import { Type, TypeKind } from "./Types";

export interface EnumField {
    name: string;
    value: number;
}

export class Enum extends Type {
    public fields: {
        [key: string]: EnumField
    } = {};
    public kind: TypeKind = TypeKind.Enum;

    public constructor(namespace: string, name: string) {
        super(namespace, name);
    }

    public addField(field: EnumField) {
        this.fields[field.name] = field;
    }
}

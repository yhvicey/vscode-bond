import { Type, TypeKind } from "./Types";

export interface Field {
    isRequired: boolean;
    isOptional: boolean;
    type: Type;
    name: string;
    hasDefaultValue: boolean;
    defaultValue: Value;
}

export class Structure extends Type {
    public base: Structure | null;
    public kind: TypeKind = TypeKind.Structure;

    public constructor(namespace: string, name: string, base: Structure | null) {
        super(namespace, name);
        this.base = base;
    }
}

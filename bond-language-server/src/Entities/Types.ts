import { Value } from "./Values";

export enum TypeKind {
    Enum,
    Structure,
}

export abstract class Type {
    public name: string;
    public namespace: string;
    public abstract kind: TypeKind;

    protected constructor(namespace: string, name: string) {
        this.namespace = namespace;
        this.name = name;
    }
}

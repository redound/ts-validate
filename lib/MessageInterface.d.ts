export interface MessageInterface {
    setType(type: string): this;
    getType(): string;
    setMessage(message: string): this;
    getMessage(): string;
    setField(field: string): this;
    toString(): string;
}

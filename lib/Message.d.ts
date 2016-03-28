import { MessageInterface } from "./MessageInterface";
export default class Message implements MessageInterface {
    protected _type: string;
    protected _message: string;
    protected _field: string;
    protected _code: number;
    constructor(message: string, field: string, type?: string, code?: number);
    setType(type: string): this;
    getType(): string;
    setMessage(message: string): this;
    getMessage(): string;
    setField(field: string): this;
    getField(): string;
    toString(): string;
}

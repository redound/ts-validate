import Validator from "../Validator";
import Validation from "../Validation";
export default class StringLength extends Validator {
    protected _allowEmpty: boolean;
    protected _min: number;
    protected _max: number;
    protected _messageMinimum: string;
    protected _messageMaximum: string;
    validate(validation: Validation, field: string): boolean;
    allowEmpty(allowEmpty?: boolean): this;
    getAllowEmpty(): boolean;
    min(min: number): this;
    getMin(): number;
    max(max: number): this;
    getMax(): number;
    messageMinimum(messageMinimum: string): this;
    getMessageMinimum(): string;
    messageMaximum(messageMaximum: string): this;
    getMessageMaximum(): string;
}

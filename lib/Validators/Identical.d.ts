import Validator from "../Validator";
import Validation from "../Validation";
export default class Identical extends Validator {
    protected _accepted: any;
    protected _value: any;
    validate(validation: Validation, field: string): boolean;
    accepted(value: any): this;
    getAccepted(): any;
    value(value: any): this;
    getValue(): any;
}

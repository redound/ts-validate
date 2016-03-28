import Validator from "../Validator";
import Validation from "../Validation";
export default class Between extends Validator {
    protected _allowEmpty: boolean;
    protected _minimum: number;
    protected _maximum: number;
    validate(validation: Validation, field: string): boolean;
    allowEmpty(allowEmpty?: boolean): this;
    minimum(minimum: number): this;
    getMinimum(): number;
    maximum(maximum: number): this;
    getMaximum(): number;
}

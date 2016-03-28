import Validator from "../Validator";
import Validation from "../Validation";
export default class Regex extends Validator {
    protected _allowEmpty: boolean;
    protected _pattern: RegExp;
    validate(validation: Validation, field: string): boolean;
    allowEmpty(allowEmpty?: boolean): this;
    getAllowEmpty(): boolean;
    pattern(pattern: RegExp): this;
    getPattern(): RegExp;
}

import Validator from "../Validator";
import Validation from "../Validation";
export default class Url extends Validator {
    static URL_REGEX: RegExp;
    protected _allowEmpty: boolean;
    validate(validation: Validation, field: string): boolean;
    allowEmpty(allowEmpty?: boolean): this;
    getAllowEmpty(): boolean;
}

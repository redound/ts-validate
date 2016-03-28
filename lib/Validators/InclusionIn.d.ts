import Validator from "../Validator";
import Validation from "../Validation";
export default class InclusionIn extends Validator {
    protected _strict: boolean;
    protected _allowEmpty: boolean;
    protected _domain: any[];
    validate(validation: Validation, field: string): boolean;
    protected inArray(needle: any, haystack: any[], strict?: boolean): boolean;
    protected compare(a: any, b: any, strict: boolean): boolean;
    strict(strict?: boolean): this;
    getStrict(): boolean;
    allowEmpty(allowEmpty?: boolean): this;
    getAllowEmpty(): boolean;
    domain(domain: any[]): this;
    getDomain(): any[];
}

import Validator from "../Validator";
import Validation from "../Validation";
export default class Confirmation extends Validator {
    protected _against: string;
    protected _labelAgainst: string;
    protected _ignoreCase: boolean;
    validate(validation: Validation, field: string): boolean;
    protected compare(a?: string, b?: string): boolean;
    ignoreCase(ignoreCase?: boolean): this;
    getIgnoreCase(): boolean;
    against(against: string): this;
    getAgainst(): string;
    labelAgainst(labelAgainst: string): this;
    getLabelAgainst(): string;
}

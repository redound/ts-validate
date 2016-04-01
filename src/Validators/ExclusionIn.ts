import Validator from "../Validator";
import Validation from "../Validation";
import Exception from "ts-core/lib/Exceptions/Exception";
import Message from "../Message";
import * as _ from "underscore";

/**
 * TSValidate.Validators.ExclusionIn
 *
 * Check if a value is not included into a list of values
 *
 *<code>
 *import ExclusionIn = TSValidate.Validators.ExclusionIn;
 *
 *validate.add('status', new ExclusionIn()
 *    .message('The status must not be A or B')
 *    .domain(['A', 'B'])
 *);
 *</code>
 */
export default class ExclusionIn extends Validator {

    protected _strict:boolean = false;

    protected _allowEmpty:boolean = false;

    protected _domain:any[];

    public validate(validation:Validation, field:string):boolean {

        var value, domain, message, label, replacePairs, strict;

        value = validation.getValue(field);

        if (this.getAllowEmpty() && this.isEmpty(value)) {
            return true;
        }

        domain = this.getDomain();

        if (!_.isArray(domain)) {
            throw new Exception('Option `domain` must be an array');
        }

        strict = this.getStrict();

        if (this.inArray(value, domain, strict)) {

            label = this.getLabel();
            if (!label) {
                label = validation.getLabel(field);
            }

            message = this.getMessage();
            replacePairs = [":field", label, ":domain", domain.join(', ')];
            if (!message) {
                message = validation.getDefaultMessage('ExclusionIn');
            }

            message = message.replace(replacePairs[0], replacePairs[1]);
            message = message.replace(replacePairs[2], replacePairs[3]);

            validation.appendMessage(new Message(message, field, "ExclusionIn"));
            return false;
        }

        return true;
    }

    /**
     *
     * @param needle The searched value.
     * @param haystack The array.
     * @param strict If the third parameter strict is set to TRUE then this function will also check the types of the needle in the haystack.
     */
    protected inArray(needle:any, haystack:any[], strict:boolean = false) {

        var inArray = false;

        _.each(haystack, part => {

            if (this.compare(part, needle, strict)) {
                inArray = true;
            }
        });

        return inArray;
    }

    protected compare(a:any, b:any, strict:boolean) {

        if (_.isObject(a) && _.isObject(b)) {
            if (strict) {
                return JSON.stringify(a) === JSON.stringify(b);
            }
            return JSON.stringify(a) == JSON.stringify(b)
        }

        if (strict) {
            return a === b;
        }

        return a == b;
    }

    public strict(strict:boolean = true):this {
        this._strict = strict;
        return this;
    }

    public getStrict():boolean {
        return this._strict;
    }

    public allowEmpty(allowEmpty:boolean = true):this {
        this._allowEmpty = allowEmpty;
        return this;
    }

    public getAllowEmpty():boolean {
        return this._allowEmpty;
    }

    public domain(domain:any[]):this {
        this._domain = domain;
        return this;
    }

    public getDomain() {
        return this._domain;
    }
}

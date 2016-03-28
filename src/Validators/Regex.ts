import Validator from "../Validator";
import Validation from "../Validation";
import Exception from "ts-core/lib/Exceptions/Exception";
import Message from "../Message";

/**
 * TSValidate.Validators.Regex
 *
 * Allows validate if the value of a field matches a regular expression
 *
 *<code>
 *import Regex = TSValidate.Validators.Regex;
 *
 *validate.add('created_at', new Regex()
 *  .pattern('/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/')
 *  .message('The creation date is invalid')
 *);
 *</code>
 */
export default class Regex extends Validator {

    protected _allowEmpty:boolean = false;

    protected _pattern:RegExp;

    public validate(validation:Validation, field:string):boolean {

        var matches, pattern, message, value, label, replacePairs;

        matches = null;
        value = validation.getValue(field);

        if (this.getAllowEmpty() && this.isEmpty(value)) {
            return true;
        }

        if (!this.getPattern()) {
            throw new Exception("No pattern set");
        }

        pattern = this.getPattern();

        if (!pattern.test(value)) {

            label = this.getLabel();
            if (!label) {
                label = validation.getLabel(field);
            }

            message = this.getMessage();
            replacePairs = [":field", label];
            if (!message) {
                validation.getDefaultMessage('Regex');
            }

            validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'Regex'));
            return false;
        }

        return true;
    }

    public allowEmpty(allowEmpty:boolean = true):this {
        this._allowEmpty = allowEmpty;
        return this;
    }

    public getAllowEmpty():boolean {
        return this._allowEmpty;
    }

    public pattern(pattern:RegExp):this {
        this._pattern = pattern;
        return this;
    }

    public getPattern() {
        return this._pattern;
    }
}

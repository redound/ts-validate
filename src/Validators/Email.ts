import Validator from "../Validator";
import Validation from "../Validation";
import Message from "../Message";
/**
 * TSValidate.Validators.Email
 *
 * Checks if a value has a correct e-mail format
 *
 *<code>
 *import Email = TSValidate.Validators.Email;
 *
 *validate.add('email', new Email()
 *   .message('The e-mail is not valid')
 *);
 *</code>
 */
export default class Email extends Validator {

    public static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    protected _allowEmpty:boolean = false;

    public validate(validation:Validation, field:string):boolean {

        var value, message, label, replacePairs;

        value = validation.getValue(field);

        if (this.getAllowEmpty() && this.isEmpty(value)) {
            return true;
        }

        if (!Email.EMAIL_REGEX.test(value)) {

            label = this.getLabel();
            if (!label) {
                label = validation.getLabel(field);
            }

            message = this.getMessage();

            replacePairs = [':field', field];

            if (!message) {
                message = validation.getDefaultMessage("Email");
            }

            validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'Email'));
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
}

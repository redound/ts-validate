import Validator from "../Validator";
import Validation from "../Validation";
import Message from "../Message";

/**
 * TSValidate.Validators.Email
 *
 * Checks if a value has a url format
 *
 *<code>
 *import Url = TSValidate.Validators.Url;
 *
 *validate.add('url', new Url()
 *  .message(':field must be a url')
 *);
 *</code>
 */
export default class Url extends Validator {

    public static URL_REGEX = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

    protected _allowEmpty:boolean = false;

    public validate(validation:Validation, field:string):boolean {

        var value, message, label, replacePairs;

        value = validation.getValue(field);

        if (this.getAllowEmpty() && this.isEmpty(value)) {
            return true;
        }

        if (!Url.URL_REGEX.test(value)) {

            label = this.getLabel();
            if (!label) {
                label = validation.getLabel(field);
            }

            message = this.getMessage();
            replacePairs = [':field', label];

            if (!message) {
                message = validation.getDefaultMessage('Url');
            }

            message.replace(replacePairs[0], replacePairs[1]);

            validation.appendMessage(new Message(message, field, 'Url'));
            return false;
        }

        return true;
    }

    public allowEmpty(allowEmpty:boolean = true) {
        this._allowEmpty = allowEmpty;
        return this;
    }

    public getAllowEmpty():boolean {
        return this._allowEmpty;
    }
}

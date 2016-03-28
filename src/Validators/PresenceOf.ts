import Validator from "../Validator";
import Validation from "../Validation";
import Message from "../Message";
/**
 * TSValidate.Validators.PresenceOf
 *
 * Validates that a value is not null or empty string
 *
 *<code>
 *import Email = TSValidate.Validators.PresenceOf;
 *
 *validate.add('name', new PresenceOf()
 *   .message('The name is required')
 *);
 *</code>
 */
export default class PresenceOf extends Validator {

    public validate(validation:Validation, field:string):boolean {

        var value:any, message:string, label:string, replacePairs:string[];

        value = validation.getValue(field);

        if (_.isNull(value) || this.isEmpty(value)) {

            var label = this.getLabel();
            if (!label) {
                label = validation.getLabel(field);
            }

            message = this.getMessage();
            replacePairs = [":field", label];
            if (!message) {
                message = validation.getDefaultMessage('PresenceOf');
            }

            validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'PresenceOf'));
            return false;
        }

        return true;
    }
}

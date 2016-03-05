///<reference path="../Validator.ts"/>
///<reference path="../Message.ts"/>

module TSValidate.Validators {

    import Validator = TSValidate.Validator;
    import Message = TSValidate.Message;

    export class PresenceOf extends Validator {

        public validate(validation: TSValidate.Validation, field: string): boolean {

            var value:any, message:string, label:string, replacePairs:string[];

            value = validation.getValue(field);

            if (_.isNull(value) || value === "") {

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
}
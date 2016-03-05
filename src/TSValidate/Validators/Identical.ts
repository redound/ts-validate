///<reference path="../Validator.ts"/>
///<reference path="../Message.ts"/>

module TSValidate.Validators {

    import Validator = TSValidate.Validator;
    import Message = TSValidate.Message;

    export class Identical extends Validator {

        protected _accepted: any;

        protected _value: any;

        public validate(validation:TSValidate.Validation, field:string): boolean {

            var message, label, replacePairs, value, valid;

            value = validation.getValue(field);

            if (this.getAccepted()) {
                valid = (this.getAccepted() == value);
            } else {
                if (this.getValue()) {
                    valid = (this.getValue() === value);
                }
            }

            if (!valid) {

                label = this.getLabel();
                if (!label) {
                    validation.getLabel(field);
                }

                message = this.getMessage();
                replacePairs = [':field', label];

                if (!message) {
                    message = validation.getDefaultMessage('Identical');
                }

                validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'Identical'));
                return false;
            }

            return true;
        }

        public accepted(value: any): this {
            this._accepted = value;
            return this;
        }

        public getAccepted(): any {
            return this._accepted;
        }

        public value(value: any): this {
            this._value = value;
            return this;
        }

        public getValue(): any {
            return this._value;
        }

    }
}
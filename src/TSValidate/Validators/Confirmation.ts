///<reference path="../Validator.ts"/>
///<reference path="../Message.ts"/>

module TSValidate.Validators {

    import Validator = TSValidate.Validator;
    import Message = TSValidate.Message;

    /**
     * TSValidate.Validators.Confirmation
     *
     * Validates that a value is between an inclusive range of two values.
     * For a value x, the test is passed if minimum<=x<=maximum.
     *
     *<code>
     *import Confirmation = TSValidate.Validators.Confirmation;
     *
     *validate.add('password', new Confirmation()
     *  .with('confirmPassword')
     *  .message('Password doesn\'t match confirmation')
     *);
     *</code>
     */
    export class Confirmation extends Validator {

        protected _against: string;

        protected _labelAgainst: string;

        protected _ignoreCase: boolean = false;

        public validate(validation: TSValidate.Validation, field: string): boolean {

            var fieldAgainst, value, valueAgainst, message, label, labelAgainst, replacePairs;

            fieldAgainst = this.getAgainst();
            value = validation.getValue(field);
            valueAgainst = validation.getValue(fieldAgainst);

            if (!this.compare(value, valueAgainst)) {

                label = this.getLabel();
                if (!label) {
                    label = validation.getLabel(field);
                }

                labelAgainst = this.getLabelAgainst();
                if (!labelAgainst) {
                    labelAgainst = validation.getLabel(fieldAgainst);
                }

                let message = this.getMessage();
                let replacePairs = [':field', label, ':against', labelAgainst];

                if (!message) {
                    message = validation.getDefaultMessage('Confirmation');
                }

                message.replace(replacePairs[0], replacePairs[1]);
                message.replace(replacePairs[2], replacePairs[3]);

                validation.appendMessage(new Message(message, field, 'Confirmation'));
                return false;
            }

            return true;
        }

        protected compare(a: string = '', b: string = ''): boolean {

            if (this.getIgnoreCase()) {
                return a.toLowerCase() === b.toLowerCase();
            }

            return a === b;
        }

        public ignoreCase(ignoreCase: boolean = true): this {
            this._ignoreCase = ignoreCase;
            return this;
        }

        public getIgnoreCase(): boolean {
            return this._ignoreCase;
        }

        public against(against: string): this {
            this._against = against;
            return this;
        }

        public getAgainst(): string {
            return this._against;
        }

        public labelAgainst(labelAgainst: string): this {
            this._labelAgainst = labelAgainst;
            return this;
        }

        public getLabelAgainst(): string {
            return this._labelAgainst;
        }
    }
}

///<reference path="../Validator.ts"/>
///<reference path="../Message.ts"/>

module TSValidate.Validators {

    import Validator = TSValidate.Validator;
    import Message = TSValidate.Message;

    /**
     * TSValidate.Validators.Between
     *
     * Validates that a value is between an inclusive range of two values.
     * For a value x, the test is passed if minimum<=x<=maximum.
     *
     *<code>
     *import Between = TSValidate.Validators.Between;
     *
     *validate.add('price', new Between()
     *  .minimum(0)
     *  .maximum(100)
     *  .message('The price must be between 0 and 100')
     *);
     *</code>
     */
    export class Between extends Validator {

        protected _allowEmpty:boolean;

        protected _minimum:number;

        protected _maximum:number;

        public validate(validation:TSValidate.Validation, field:string):boolean {

            var value, minimum, maximum, message, label, replacePairs;

            value = validation.getValue(field);

            minimum = this.getMinimum();
            maximum = this.getMaximum();

            if (this.allowEmpty() && this.isEmpty(value)) {
                return true;
            }

            if (value < minimum || value > maximum) {

                label = this.getLabel();
                if (!label) {
                    validation.getLabel(field);
                }

                message = this.getMessage();
                replacePairs = [':field', label, ':min', minimum, ':max', maximum];
                if (!message) {
                    message = validation.getDefaultMessage('Between');
                }

                message.replace(replacePairs[0], replacePairs[1]);
                message.replace(replacePairs[1], replacePairs[2]);
                message.replace(replacePairs[3], replacePairs[4]);
                validation.appendMessage(new Message(message, field, 'Between'));
                return false;
            }

            return true;
        }

        public allowEmpty(allowEmpty:boolean = true):this {
            this._allowEmpty = allowEmpty;
            return this;
        }

        public minimum(minimum:number):this {
            this._minimum = minimum;
            return this;
        }

        public getMinimum():number {
            return this._minimum;
        }

        public maximum(maximum:number):this {
            this._maximum = maximum;
            return this;
        }

        public getMaximum():number {
            return this._maximum;
        }
    }
}
import Validator from "../Validator";
import Validation from "../Validation";
import Exception from "ts-core/lib/Exceptions/Exception";
import Message from "../Message";
import * as _ from "underscore";

/**
 * TSValidate.Validators.StringLength
 *
 * Validates that a string has the specified maximum and minimum constraints
 * The test is passed if for a string's length L, min<=L<=max, i.e. L must
 * be at least min, and at most max.
 *
 *<code>
 *import StringLength = TSValidate.Validators.StringLength;
 *
 *validate.add('name_last', new StringLength()
 *   .max(50)
 *   .min(2)
 *   .messageMaximum('We don\'t like really long names')
 *   .messageMinimum('We want more than just their initials')
 *);
 *</code>
 */
export default class StringLength extends Validator {

    protected _allowEmpty:boolean = false;

    protected _min:number;

    protected _max:number;

    protected _messageMinimum:string;

    protected _messageMaximum:string;

    public validate(validation:Validation, field:string):boolean {

        var isSetMin, isSetMax, value, length, message, minimum, maximum, label, replacePairs;

        isSetMin = !_.isUndefined(this.getMin());
        isSetMax = !_.isUndefined(this.getMax());

        if (!isSetMin && !isSetMax) {
            throw new Exception("A minimum or maximum must be set");
        }

        value = validation.getValue(field);

        if (this.getAllowEmpty() && this.isEmpty(value)) {
            return true;
        }

        label = this.getLabel();
        if (!label) {
            label = validation.getLabel(field);
        }

        length = 0;

        if (_.isString(value)) {
            length = value.length;
        }

        /**
         * Maximum length
         */
        if (isSetMax) {

            maximum = this.getMax();
            if (length > maximum) {

                message = this.getMessageMaximum();
                replacePairs = [':field', label, ':max', maximum];

                if (!message) {
                    message = validation.getDefaultMessage('TooLong');
                }

                message.replace(replacePairs[0], replacePairs[1]);
                message.replace(replacePairs[2], replacePairs[3]);
                validation.appendMessage(new Message(message, field, 'TooLong'));
                return false;
            }
        }

        /**
         * Minimum length
         */
        if (isSetMin) {

            minimum = this.getMin();
            if (length < minimum) {

                message = this.getMessageMinimum();
                replacePairs = [':field', label, ':min', minimum];
                if (!message) {
                    message = validation.getDefaultMessage('TooShort');
                }

                message.replace(replacePairs[0], replacePairs[1]);
                message.replace(replacePairs[1], replacePairs[2]);
                validation.appendMessage(new Message(message, field, "TooShort"));
                return false;
            }
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

    public min(min:number):this {
        this._min = min;
        return this;
    }

    public getMin():number {
        return this._min;
    }

    public max(max:number):this {
        this._max = max;
        return this;
    }

    public getMax():number {
        return this._max;
    }

    public messageMinimum(messageMinimum:string):this {
        this._messageMinimum = messageMinimum;
        return this;
    }

    public getMessageMinimum():string {
        return this._messageMinimum;
    }

    public messageMaximum(messageMaximum:string):this {
        this._messageMaximum = messageMaximum;
        return this;
    }

    public getMessageMaximum():string {
        return this._messageMaximum;
    }
}

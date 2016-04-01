import {ValidatorInterface} from "./ValidatorInterface";
import Validation from "./Validation";
import * as _ from "underscore";

export default class Validator implements ValidatorInterface {

    protected _options;

    protected _label:string;

    protected _message:string;

    public constructor(options:any = {}) {

        this._options = options;
    }

    protected isEmpty(value) {
        return value === "" || _.isNull(value);
    }

    /**
     * Cehck if an option is defined
     * @param key
     * @returns {boolean}
     */
    public hasOption(key:string):boolean {
        return !_.isUndefined(this._options[key]);
    }

    /**
     * Returns an option in the validator's options
     * Returns null if the option hasn't been set
     * @param key
     * @param defaultValue
     * @returns {any}
     */
    public getOption(key:string, defaultValue:any = null):any {

        if (this.hasOption(key)) {
            return this._options[key];
        }

        return defaultValue;
    }

    /**
     * Sets an option in the validator
     * @param key
     * @param value
     */
    public setOption(key:string, value:any):void {

        this._options[key] = value;
    }

    /**
     * Set label for validator
     *
     * @param label
     * @returns {TSValidate.Validator}
     */
    public label(label:string):this {
        this._label = label;
        return this;
    }

    /**
     * Get label for validator
     *
     * @returns {string}
     */
    public getLabel():string {
        return this._label;
    }

    /**
     * Set message for validator
     *
     * @param message
     * @returns {TSValidate.Validator}
     */
    public message(message:string):this {
        this._message = message;
        return this;
    }

    /**
     * Get message for validator
     *
     * @returns {string}
     */
    public getMessage():string {
        return this._message;
    }

    public validate(validation:Validation, attribute:string):boolean {

        return false;
    }

}

import { ValidatorInterface } from "./ValidatorInterface";
import Validation from "./Validation";
export default class Validator implements ValidatorInterface {
    protected _options: any;
    protected _label: string;
    protected _message: string;
    constructor(options?: any);
    protected isEmpty(value: any): boolean;
    hasOption(key: string): boolean;
    getOption(key: string, defaultValue?: any): any;
    setOption(key: string, value: any): void;
    label(label: string): this;
    getLabel(): string;
    message(message: string): this;
    getMessage(): string;
    validate(validation: Validation, attribute: string): boolean;
}

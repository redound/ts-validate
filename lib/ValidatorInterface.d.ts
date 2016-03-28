import Validation from "./Validation";
export interface ValidatorInterface {
    hasOption(key: string): boolean;
    getOption(key: string, defaultValue?: any): any;
    validate(validation: Validation, attribute: string): boolean;
}

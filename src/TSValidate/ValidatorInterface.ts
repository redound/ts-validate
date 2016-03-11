module TSValidate {

    export interface ValidatorInterface {

        /**
         * Checks if an option defined
         * @param key
         */
        hasOption(key:string): boolean;

        /**
         * Returns an option in the validator's options
         * Returns null if the option hasn't set
         * @param key
         * @param defaultValue
         */
        getOption(key:string, defaultValue?:any): any;

        /**
         * Executes the validation
         * @param validation
         * @param attribute
         */
        validate(validation:TSValidate.Validation, attribute:string): boolean;
    }
}
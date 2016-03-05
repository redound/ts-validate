///<reference path="Exception.ts"/>

module TSValidate {

    export class Validation {

        protected _data;

        protected _entity;

        protected _validators:TSCore.Data.Dictionary<string, ValidatorInterface> = new TSCore.Data.Dictionary<string, ValidatorInterface>();

        protected _messages: TSCore.Data.Collection<MessageInterface> = new TSCore.Data.Collection<MessageInterface>();

        protected _defaultMessages: any;

        protected _labels: TSCore.Data.Dictionary<string, string> = new TSCore.Data.Dictionary<string, string>();

        protected _values;

        public construct(validators:TSCore.Data.Dictionary<string, ValidatorInterface>) {

            this._validators = validators;

            this.setDefaultMessages();

            this.initialize();
        }

        public initialize() {

        }

        protected beforeValidation(data:any, entity:any, messages:TSCore.Data.Collection<MessageInterface>) {

        }

        protected afterValidation(data:any, entity:any, messages:TSCore.Data.Collection<MessageInterface>) {

        }

        /**
         * Validate a set of data according to a set of rules
         *
         * @param data
         * @param entity
         * @returns {any}
         */
        public validate(data:any = null, entity:any = null):TSCore.Data.Collection<MessageInterface> {

            var validators, messages, field, validator:ValidatorInterface, status;

            validators = this._validators;

            if (validators.isEmpty()) {
                throw new Exception("There are no validators to validate");
            }

            /**
             * Clear pre-calculated values
             */
            this._values = null;

            messages = new TSCore.Data.Collection<MessageInterface>();

            status = this.beforeValidation(data, entity, messages);

            if (status === false) {
                return status;
            }

            this._messages = messages;

            if (_.isArray(data) || _.isObject(data)) {
                this._data = data;
            }

            validators.each((field, validator: ValidatorInterface) => {

                if (!(validator instanceof Validator)) {
                    throw new Exception("One of the validators is not valid");
                }

                if (validator.validate(this, field) === false) {
                    if (validator.getOption("cancelOnFail")) {
                        return;
                    }
                }
            });

            messages = this._messages;
            this.afterValidation(data, entity, messages);
            return messages;
        }

        /**
         * Adds a validator to a field
         *
         * @param field
         * @param validator
         * @returns {TSValidate.Validation}
         */
        public add(field:string, validator:ValidatorInterface):this {

            this._validators.set(field, validator);
            return this;
        }

        /**
         * Alias of `add` method
         *
         * @param field
         * @param validator
         */
        public rule(field:string, validator:ValidatorInterface):this {

            return this.add(field, validator);
        }

        public rules(field:string, validators:ValidatorInterface[] = []):this {

            _.each(validators, validator => {

                if (validator instanceof Validator) {
                    this._validators.set(field, validator);
                }
            });

            return this;
        }

        /**
         * Returns the validators added to the validation
         *
         * @returns {TSCore.Data.Dictionary<string, ValidatorInterface>}
         */
        public getValidators(): TSCore.Data.Dictionary<string, ValidatorInterface> {

            return this._validators;
        }

        /**
         * Returns the bound entity
         *
         * @returns {any}
         */
        public getEntity() {

            return this._entity;
        }

        /**
         * Adds default messages to validators
         *
         * @param messages
         * @returns {*}
         */
        public setDefaultMessages(messages: any = {}): any {

            var defaultMessages = {
                Alnum: "Field :field must contain only letters and numbers",
                Alpha: "Field :field must contain only letters",
                Between: "Field :field must be within the range of :min to :max",
                Confirmation: "Field :field must be the same as :with",
                Digit: "Field :field must be numeric",
                Email: "Field :field must be an email address",
                ExclusionIn: "Field :field must not be a part of list: :domain",
                FileEmpty: "Field :field must not be empty",
                FileIniSize: "File :field exceeds the maximum file size",
                FileMaxResolution: "File :field must not exceed :max resolution",
                FileMinResolution: "File :field must be at least :min resolution",
                FileSize: "File :field exceeds the size of :max",
                FileType: "File :field must be of type: :types",
                FileValid: "Field :field is not valid",
                Identical: "Field :field does not have the expected value",
                InclusionIn: "Field :field must be a part of list: :domain",
                Numericality: "Field :field does not have a valid numeric format",
                PresenceOf: "Field :field is required",
                Regex: "Field :field does not match the required format",
                TooLong: "Field :field must not exceed :max characters long",
                TooShort: "Field :field must be at least :min characters long",
                Uniqueness: "Field :field must be unique",
                Url: "Field :field must be a url",
                CreditCard: "Field :field is not valid for a credit card number"
            };

            return this._defaultMessages = _.extend(defaultMessages, messages);
        }

        /**
         * Get the default message for validator type
         *
         * @param type
         * @returns {any}
         */
        public getDefaultMessage(type: string): string {

            if (_.isUndefined(this._defaultMessages[type])) {
                return "";
            }

            return this._defaultMessages[type];
        }

        /**
         * Returns the registered validators
         *
         * @returns {any}
         */
        public getMessages(): TSCore.Data.Collection<MessageInterface> {

            return this._messages;
        }

        /**
         * Adds labels for fields
         *
         * @param labels
         */
        public setLabels(labels: TSCore.Data.Dictionary<string, string>) {

            this._labels = labels;
        }

        /**
         * Get label for field
         *
         * @param field
         * @returns {string|V}
         */
        public getLabel(field: string) {

            return this._labels.get(field);
        }

        /**
         * Appends a message to the messages collection
         *
         * @param message
         * @returns {TSValidate.Validation}
         */
        public appendMessage(message: MessageInterface): this {

            this._messages.add(message);
            return this;
        }

        /**
         * Assigns the data to an entity
         * The entity is used to obtain the validation values
         *
         * @param entity
         * @param data
         * @returns {TSValidate.Validation}
         */
        public bind(entity: any, data: any): this {

            if (!_.isObject(entity)) {
                throw new Exception("Entity must be an object");
            }

            if (!_.isObject(data)) {
                throw new Exception("Data to validate must be an object");
            }

            this._entity = entity;
            this._data = data;

            return this;
        }

        /**
         * Gets the value to validate in the object data source
         * @param field
         */
        public getValue(field: string) {

            var entity, method: string, value: any, data, values, filters;

            entity = this._entity;

            if (_.isObject(entity)) {
                method = `get${field}`;
                if (entity[method] instanceof Function) {
                    value = entity[method]();
                } else {

                    if (entity['get'] instanceof Function) {
                        value = entity['get']();
                    } else {
                        if (!_.isUndefined(entity[field])) {
                            value = entity[field];
                        } else {
                            value = null;
                        }
                    }
                }

                return value;
            }

            data = this._data;

            if (!_.isObject(data)) {
                throw new Exception("There is no data to validate");
            }

            values = this._values;

            if (values && !_.isUndefined(values[field])) {
                return values[field];
            }

            value = null;

            if (!_.isUndefined(data[field])) {
                return data[field];
            }

            return value;
        }
    }
}
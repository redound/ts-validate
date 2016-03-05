/// <reference path="../node_modules/ts-core/build/ts-core.d.ts" />
declare module TSValidate {
    class Exception extends TSCore.Exception.Exception {
    }
}
declare module TSValidate {
    class Message implements MessageInterface {
        protected _type: string;
        protected _message: string;
        protected _field: string;
        protected _code: number;
        constructor(message: string, field: string, type?: string, code?: number);
        setType(type: string): this;
        getType(): string;
        setMessage(message: string): this;
        getMessage(): string;
        setField(field: string): this;
        toString(): string;
    }
}
declare module TSValidate {
    interface MessageInterface {
        setType(type: string): this;
        getType(): string;
        setMessage(message: string): this;
        getMessage(): string;
        setField(field: string): this;
        toString(): string;
    }
}
declare module TSValidate {
}
declare module TSValidate {
    class Validation {
        protected _data: any;
        protected _entity: any;
        protected _validators: TSCore.Data.Dictionary<string, ValidatorInterface>;
        protected _messages: TSCore.Data.Collection<MessageInterface>;
        protected _defaultMessages: any;
        protected _labels: TSCore.Data.Dictionary<string, string>;
        protected _values: any;
        construct(validators: TSCore.Data.Dictionary<string, ValidatorInterface>): void;
        initialize(): void;
        protected beforeValidation(data: any, entity: any, messages: TSCore.Data.Collection<MessageInterface>): void;
        protected afterValidation(data: any, entity: any, messages: TSCore.Data.Collection<MessageInterface>): void;
        validate(data?: any, entity?: any): TSCore.Data.Collection<MessageInterface>;
        add(field: string, validator: ValidatorInterface): this;
        rule(field: string, validator: ValidatorInterface): this;
        rules(field: string, validators?: ValidatorInterface[]): this;
        getValidators(): TSCore.Data.Dictionary<string, ValidatorInterface>;
        getEntity(): any;
        setDefaultMessages(messages?: any): any;
        getDefaultMessage(type: string): string;
        getMessages(): TSCore.Data.Collection<MessageInterface>;
        setLabels(labels: TSCore.Data.Dictionary<string, string>): void;
        getLabel(field: string): string;
        appendMessage(message: MessageInterface): this;
        bind(entity: any, data: any): this;
        getValue(field: string): any;
    }
}
declare module TSValidate {
    interface ValidatorInterface {
        hasOption(key: string): boolean;
        getOption(key: string, defaultValue?: any): any;
        validate(validation: TSValidate.Validation, attribute: string): boolean;
    }
}
declare module TSValidate {
    class Validator implements ValidatorInterface {
        protected _options: any;
        protected _label: string;
        protected _message: string;
        constructor(options?: any);
        hasOption(key: string): boolean;
        getOption(key: string, defaultValue?: any): any;
        setOption(key: string, value: any): void;
        label(label: string): this;
        getLabel(): string;
        message(message: string): this;
        getMessage(): string;
        validate(validation: TSValidate.Validation, attribute: string): boolean;
    }
}
declare module TSValidate.Validators {
    class Between {
    }
}
declare module TSValidate.Validators {
    class Confirmation {
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class Email extends Validator {
        static EMAIL_REGEX: RegExp;
        protected _allowEmpty: boolean;
        validate(validation: TSValidate.Validation, field: string): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        getAllowEmpty(): boolean;
    }
}
declare module TSValidate.Validators {
    class ExclusionIn {
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class Identical extends Validator {
        protected _accepted: any;
        protected _value: any;
        validate(validation: TSValidate.Validation, field: string): boolean;
        accepted(value: any): this;
        getAccepted(): any;
        value(value: any): this;
        getValue(): any;
    }
}
declare module TSValidate.Validators {
    class InclusionIn {
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class PresenceOf extends Validator {
        validate(validation: TSValidate.Validation, field: string): boolean;
    }
}
declare module TSValidate.Validators {
    class Regex {
    }
}
declare module TSValidate.Validators {
    class StringLength {
    }
}
declare module TSValidate.Validators {
    class Url {
    }
}

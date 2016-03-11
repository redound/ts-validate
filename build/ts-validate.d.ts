/// <reference path="../node_modules/ts-core/build/ts-core.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
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
        protected isEmpty(value: any): boolean;
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
    import Validator = TSValidate.Validator;
    class Between extends Validator {
        protected _allowEmpty: boolean;
        protected _minimum: number;
        protected _maximum: number;
        validate(validation: TSValidate.Validation, field: string): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        minimum(minimum: number): this;
        getMinimum(): number;
        maximum(maximum: number): this;
        getMaximum(): number;
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class Confirmation extends Validator {
        protected _against: string;
        protected _labelAgainst: string;
        protected _ignoreCase: boolean;
        validate(validation: TSValidate.Validation, field: string): boolean;
        protected compare(a?: string, b?: string): boolean;
        ignoreCase(ignoreCase?: boolean): this;
        getIgnoreCase(): boolean;
        against(against: string): this;
        getAgainst(): string;
        labelAgainst(labelAgainst: string): this;
        getLabelAgainst(): string;
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
    import Validator = TSValidate.Validator;
    class ExclusionIn extends Validator {
        protected _strict: boolean;
        protected _allowEmpty: boolean;
        protected _domain: any[];
        validate(validation: TSValidate.Validation, field: string): boolean;
        protected inArray(needle: any, haystack: any[], strict?: boolean): boolean;
        protected compare(a: any, b: any, strict: boolean): boolean;
        strict(strict?: boolean): this;
        getStrict(): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        getAllowEmpty(): boolean;
        domain(domain: any[]): this;
        getDomain(): any[];
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
    import Validator = TSValidate.Validator;
    class InclusionIn extends Validator {
        protected _strict: boolean;
        protected _allowEmpty: boolean;
        protected _domain: any[];
        validate(validation: TSValidate.Validation, field: string): boolean;
        protected inArray(needle: any, haystack: any[], strict?: boolean): boolean;
        protected compare(a: any, b: any, strict: boolean): boolean;
        strict(strict?: boolean): this;
        getStrict(): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        getAllowEmpty(): boolean;
        domain(domain: any[]): this;
        getDomain(): any[];
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class PresenceOf extends Validator {
        validate(validation: TSValidate.Validation, field: string): boolean;
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class Regex extends Validator {
        protected _allowEmpty: boolean;
        protected _pattern: RegExp;
        validate(validation: TSValidate.Validation, field: string): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        getAllowEmpty(): boolean;
        pattern(pattern: RegExp): this;
        getPattern(): RegExp;
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class StringLength extends Validator {
        protected _allowEmpty: boolean;
        protected _min: number;
        protected _max: number;
        protected _messageMinimum: string;
        protected _messageMaximum: string;
        validate(validation: TSValidate.Validation, field: string): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        getAllowEmpty(): boolean;
        min(min: number): this;
        getMin(): number;
        max(max: number): this;
        getMax(): number;
        messageMinimum(messageMinimum: string): this;
        getMessageMinimum(): string;
        messageMaximum(messageMaximum: string): this;
        getMessageMaximum(): string;
    }
}
declare module TSValidate.Validators {
    import Validator = TSValidate.Validator;
    class Url extends Validator {
        static URL_REGEX: RegExp;
        protected _allowEmpty: boolean;
        validate(validation: TSValidate.Validation, field: string): boolean;
        allowEmpty(allowEmpty?: boolean): this;
        getAllowEmpty(): boolean;
    }
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
        presenceOf(field: string, message?: string): this;
        identical(field: string, accepted?: any, message?: string): this;
        email(field: string, message?: string): this;
        exclusionIn(field: string, domain: any[], message?: string): this;
        inclusionIn(field: string, domain: any[], message?: string): this;
        regex(field: string, pattern: RegExp, message?: string): this;
        stringLength(field: string, min: number, max: number, messageMinimum?: string, messageMaximum?: string): this;
        between(field: string, minimum: number, maximum: number, message?: string): this;
        confirmation(field: string, against: string, message?: string): this;
        url(field: string, message?: string): this;
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

"use strict";
var Dictionary_1 = require("ts-core/lib/Data/Dictionary");
var Collection_1 = require("ts-core/lib/Data/Collection");
var Exception_1 = require("ts-core/lib/Exceptions/Exception");
var Validator_1 = require("./Validator");
var PresenceOf_1 = require("./Validators/PresenceOf");
var Identical_1 = require("./Validators/Identical");
var Email_1 = require("./Validators/Email");
var ExclusionIn_1 = require("./Validators/ExclusionIn");
var InclusionIn_1 = require("./Validators/InclusionIn");
var Regex_1 = require("./Validators/Regex");
var StringLength_1 = require("./Validators/StringLength");
var Between_1 = require("./Validators/Between");
var Confirmation_1 = require("./Validators/Confirmation");
var Url_1 = require("./Validators/Url");
var Validation = (function () {
    function Validation() {
        this._validators = new Dictionary_1.default();
        this._messages = new Collection_1.default();
        this._labels = new Dictionary_1.default();
    }
    Validation.prototype.construct = function (validators) {
        this._validators = validators;
        this.setDefaultMessages();
        this.initialize();
    };
    Validation.prototype.initialize = function () {
    };
    Validation.prototype.beforeValidation = function (data, entity, messages) {
    };
    Validation.prototype.afterValidation = function (data, entity, messages) {
    };
    Validation.prototype.validate = function (data, entity) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (entity === void 0) { entity = null; }
        var validators, messages, field, validator, status;
        messages = new Collection_1.default();
        validators = this._validators;
        if (validators.isEmpty()) {
            throw new Exception_1.default("There are no validators to validate");
        }
        this._values = null;
        if (!_.isNull(entity)) {
            this._entity = entity;
        }
        status = this.beforeValidation(data, entity, messages);
        if (status === false) {
            return messages;
        }
        this._messages = messages;
        if (_.isArray(data) || _.isObject(data)) {
            this._data = data;
        }
        validators.each(function (field, validator) {
            if (!(validator instanceof Validator_1.default)) {
                throw new Exception_1.default("One of the validators is not valid");
            }
            if (validator.validate(_this, field) === false) {
                if (validator.getOption("cancelOnFail")) {
                    return messages;
                }
            }
        });
        messages = this._messages;
        this.afterValidation(data, entity, messages);
        return messages;
    };
    Validation.prototype.add = function (field, validator) {
        this._validators.set(field, validator);
        return this;
    };
    Validation.prototype.presenceOf = function (field, message) {
        this.add(field, new PresenceOf_1.default()
            .message(message));
        return this;
    };
    Validation.prototype.identical = function (field, accepted, message) {
        if (accepted === void 0) { accepted = true; }
        this.add(field, new Identical_1.default()
            .accepted(accepted)
            .message(message));
        return this;
    };
    Validation.prototype.email = function (field, message) {
        this.add(field, new Email_1.default()
            .message(message));
        return this;
    };
    Validation.prototype.exclusionIn = function (field, domain, message) {
        this.add(field, new ExclusionIn_1.default()
            .domain(domain)
            .message(message));
        return this;
    };
    Validation.prototype.inclusionIn = function (field, domain, message) {
        this.add(field, new InclusionIn_1.default()
            .domain(domain)
            .message(message));
        return this;
    };
    Validation.prototype.regex = function (field, pattern, message) {
        this.add(field, new Regex_1.default()
            .pattern(pattern)
            .message(message));
        return this;
    };
    Validation.prototype.stringLength = function (field, min, max, messageMinimum, messageMaximum) {
        this.add(field, new StringLength_1.default()
            .min(min)
            .max(max)
            .messageMinimum(messageMinimum)
            .messageMaximum(messageMaximum));
        return this;
    };
    Validation.prototype.between = function (field, minimum, maximum, message) {
        this.add(field, new Between_1.default()
            .minimum(minimum)
            .maximum(maximum)
            .message(message));
        return this;
    };
    Validation.prototype.confirmation = function (field, against, message) {
        this.add(field, new Confirmation_1.default()
            .against(against)
            .message(message));
        return this;
    };
    Validation.prototype.url = function (field, message) {
        this.add(field, new Url_1.default()
            .message(message));
        return this;
    };
    Validation.prototype.rule = function (field, validator) {
        return this.add(field, validator);
    };
    Validation.prototype.rules = function (field, validators) {
        var _this = this;
        if (validators === void 0) { validators = []; }
        _.each(validators, function (validator) {
            if (validator instanceof Validator_1.default) {
                _this._validators.set(field, validator);
            }
        });
        return this;
    };
    Validation.prototype.getValidators = function () {
        return this._validators;
    };
    Validation.prototype.getEntity = function () {
        return this._entity;
    };
    Validation.prototype.setDefaultMessages = function (messages) {
        if (messages === void 0) { messages = {}; }
        var defaultMessages = {
            Alnum: "Field :field must contain only letters and numbers",
            Alpha: "Field :field must contain only letters",
            Between: "Field :field must be within the range of :min to :max",
            Confirmation: "Field :field must be the same as :against",
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
    };
    Validation.prototype.getDefaultMessage = function (type) {
        if (_.isUndefined(this._defaultMessages[type])) {
            return "";
        }
        return this._defaultMessages[type];
    };
    Validation.prototype.getMessages = function () {
        return this._messages.clone();
    };
    Validation.prototype.setLabels = function (labels) {
        this._labels = labels;
    };
    Validation.prototype.getLabel = function (field) {
        return this._labels.get(field);
    };
    Validation.prototype.appendMessage = function (message) {
        this._messages.add(message);
        return this;
    };
    Validation.prototype.bind = function (entity, data) {
        if (!_.isObject(entity)) {
            throw new Exception_1.default("Entity must be an object");
        }
        if (!_.isObject(data)) {
            throw new Exception_1.default("Data to validate must be an object");
        }
        this._entity = entity;
        this._data = data;
        return this;
    };
    Validation.prototype.getValue = function (field) {
        var entity, method, value, data, values, filters;
        entity = this._entity;
        if (_.isObject(entity)) {
            method = "get" + field;
            if (entity[method] instanceof Function) {
                value = entity[method]();
            }
            else {
                if (entity['get'] instanceof Function) {
                    value = entity['get'](field);
                }
                else {
                    if (!_.isUndefined(entity[field])) {
                        value = entity[field];
                    }
                    else {
                        value = null;
                    }
                }
            }
            return value;
        }
        data = this._data;
        if (!_.isObject(data)) {
            throw new Exception_1.default("There is no data to validate");
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
    };
    return Validation;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Validation;

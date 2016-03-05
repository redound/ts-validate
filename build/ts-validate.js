var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSValidate;
(function (TSValidate) {
    var Exception = (function (_super) {
        __extends(Exception, _super);
        function Exception() {
            _super.apply(this, arguments);
        }
        return Exception;
    })(TSCore.Exception.Exception);
    TSValidate.Exception = Exception;
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Message = (function () {
        function Message(message, field, type, code) {
            if (type === void 0) { type = null; }
            if (code === void 0) { code = null; }
            this._message = message;
            this._field = field;
            this._type = type;
            this._code = code;
        }
        Message.prototype.setType = function (type) {
            this._type = type;
            return this;
        };
        Message.prototype.getType = function () {
            return this._type;
        };
        Message.prototype.setMessage = function (message) {
            this._message = message;
            return this;
        };
        Message.prototype.getMessage = function () {
            return this._message;
        };
        Message.prototype.setField = function (field) {
            this._field = field;
            return this;
        };
        Message.prototype.toString = function () {
            return this._message;
        };
        return Message;
    })();
    TSValidate.Message = Message;
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validation = (function () {
        function Validation() {
            this._validators = new TSCore.Data.Dictionary();
            this._messages = new TSCore.Data.Collection();
            this._labels = new TSCore.Data.Dictionary();
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
            validators = this._validators;
            if (validators.isEmpty()) {
                throw new TSValidate.Exception("There are no validators to validate");
            }
            this._values = null;
            messages = new TSCore.Data.Collection();
            status = this.beforeValidation(data, entity, messages);
            if (status === false) {
                return status;
            }
            this._messages = messages;
            if (_.isArray(data) || _.isObject(data)) {
                this._data = data;
            }
            validators.each(function (field, validator) {
                if (!(validator instanceof TSValidate.Validator)) {
                    throw new TSValidate.Exception("One of the validators is not valid");
                }
                if (validator.validate(_this, field) === false) {
                    if (validator.getOption("cancelOnFail")) {
                        return;
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
        Validation.prototype.rule = function (field, validator) {
            return this.add(field, validator);
        };
        Validation.prototype.rules = function (field, validators) {
            var _this = this;
            if (validators === void 0) { validators = []; }
            _.each(validators, function (validator) {
                if (validator instanceof TSValidate.Validator) {
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
        };
        Validation.prototype.getDefaultMessage = function (type) {
            if (_.isUndefined(this._defaultMessages[type])) {
                return "";
            }
            return this._defaultMessages[type];
        };
        Validation.prototype.getMessages = function () {
            return this._messages;
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
                throw new TSValidate.Exception("Entity must be an object");
            }
            if (!_.isObject(data)) {
                throw new TSValidate.Exception("Data to validate must be an object");
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
                        value = entity['get']();
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
                throw new TSValidate.Exception("There is no data to validate");
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
    })();
    TSValidate.Validation = Validation;
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validator = (function () {
        function Validator(options) {
            if (options === void 0) { options = {}; }
            this._options = options;
        }
        Validator.prototype.hasOption = function (key) {
            return !_.isUndefined(this._options[key]);
        };
        Validator.prototype.getOption = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            if (this.hasOption(key)) {
                return this._options[key];
            }
            return defaultValue;
        };
        Validator.prototype.setOption = function (key, value) {
            this._options[key] = value;
        };
        Validator.prototype.label = function (label) {
            this._label = label;
            return this;
        };
        Validator.prototype.getLabel = function () {
            return this._label;
        };
        Validator.prototype.message = function (message) {
            this._message = message;
            return this;
        };
        Validator.prototype.getMessage = function () {
            return this._message;
        };
        Validator.prototype.validate = function (validation, attribute) {
            return false;
        };
        return Validator;
    })();
    TSValidate.Validator = Validator;
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Between = (function () {
            function Between() {
            }
            return Between;
        })();
        Validators.Between = Between;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Confirmation = (function () {
            function Confirmation() {
            }
            return Confirmation;
        })();
        Validators.Confirmation = Confirmation;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var Email = (function (_super) {
            __extends(Email, _super);
            function Email() {
                _super.apply(this, arguments);
                this._allowEmpty = false;
            }
            Email.prototype.validate = function (validation, field) {
                var value, message, label, replacePairs;
                value = validation.getValue(field);
                if (this.getAllowEmpty() && value === "") {
                    return true;
                }
                if (!Email.EMAIL_REGEX.test(value)) {
                    label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [':field', field];
                    if (!message) {
                        message = validation.getDefaultMessage("Email");
                    }
                    validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'Email'));
                    return false;
                }
                return true;
            };
            Email.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            Email.prototype.getAllowEmpty = function () {
                return this._allowEmpty;
            };
            Email.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return Email;
        })(Validator);
        Validators.Email = Email;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var ExclusionIn = (function () {
            function ExclusionIn() {
            }
            return ExclusionIn;
        })();
        Validators.ExclusionIn = ExclusionIn;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var Identical = (function (_super) {
            __extends(Identical, _super);
            function Identical() {
                _super.apply(this, arguments);
            }
            Identical.prototype.validate = function (validation, field) {
                var message, label, replacePairs, value, valid;
                value = validation.getValue(field);
                if (this.getAccepted()) {
                    valid = (this.getAccepted() == value);
                }
                else {
                    if (this.getValue()) {
                        valid = (this.getValue() === value);
                    }
                }
                if (!valid) {
                    label = this.getLabel();
                    if (!label) {
                        validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [':field', label];
                    if (!message) {
                        message = validation.getDefaultMessage('Identical');
                    }
                    validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'Identical'));
                    return false;
                }
                return true;
            };
            Identical.prototype.accepted = function (value) {
                this._accepted = value;
                return this;
            };
            Identical.prototype.getAccepted = function () {
                return this._accepted;
            };
            Identical.prototype.value = function (value) {
                this._value = value;
                return this;
            };
            Identical.prototype.getValue = function () {
                return this._value;
            };
            return Identical;
        })(Validator);
        Validators.Identical = Identical;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var InclusionIn = (function () {
            function InclusionIn() {
            }
            return InclusionIn;
        })();
        Validators.InclusionIn = InclusionIn;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var PresenceOf = (function (_super) {
            __extends(PresenceOf, _super);
            function PresenceOf() {
                _super.apply(this, arguments);
            }
            PresenceOf.prototype.validate = function (validation, field) {
                var value, message, label, replacePairs;
                value = validation.getValue(field);
                if (_.isNull(value) || value === "") {
                    var label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [":field", label];
                    if (!message) {
                        message = validation.getDefaultMessage('PresenceOf');
                    }
                    validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'PresenceOf'));
                    return false;
                }
                return true;
            };
            return PresenceOf;
        })(Validator);
        Validators.PresenceOf = PresenceOf;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Regex = (function () {
            function Regex() {
            }
            return Regex;
        })();
        Validators.Regex = Regex;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var StringLength = (function () {
            function StringLength() {
            }
            return StringLength;
        })();
        Validators.StringLength = StringLength;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Url = (function () {
            function Url() {
            }
            return Url;
        })();
        Validators.Url = Url;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
//# sourceMappingURL=ts-validate.js.map
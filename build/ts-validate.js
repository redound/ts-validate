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
    var Validator = (function () {
        function Validator(options) {
            if (options === void 0) { options = {}; }
            this._options = options;
        }
        Validator.prototype.isEmpty = function (value) {
            return value === "" || _.isNull(value);
        };
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
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var Between = (function (_super) {
            __extends(Between, _super);
            function Between() {
                _super.apply(this, arguments);
            }
            Between.prototype.validate = function (validation, field) {
                var value, minimum, maximum, message, label, replacePairs;
                value = validation.getValue(field);
                minimum = this.getMinimum();
                maximum = this.getMaximum();
                if (this.allowEmpty() && this.isEmpty(value)) {
                    return true;
                }
                if (value < minimum || value > maximum) {
                    label = this.getLabel();
                    if (!label) {
                        validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [':field', label, ':min', minimum, ':max', maximum];
                    if (!message) {
                        message = validation.getDefaultMessage('Between');
                    }
                    message.replace(replacePairs[0], replacePairs[1]);
                    message.replace(replacePairs[1], replacePairs[2]);
                    message.replace(replacePairs[3], replacePairs[4]);
                    validation.appendMessage(new Message(message, field, 'Between'));
                    return false;
                }
                return true;
            };
            Between.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            Between.prototype.minimum = function (minimum) {
                this._minimum = minimum;
                return this;
            };
            Between.prototype.getMinimum = function () {
                return this._minimum;
            };
            Between.prototype.maximum = function (maximum) {
                this._maximum = maximum;
                return this;
            };
            Between.prototype.getMaximum = function () {
                return this._maximum;
            };
            return Between;
        })(Validator);
        Validators.Between = Between;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var Confirmation = (function (_super) {
            __extends(Confirmation, _super);
            function Confirmation() {
                _super.apply(this, arguments);
                this._ignoreCase = false;
            }
            Confirmation.prototype.validate = function (validation, field) {
                var fieldAgainst, value, valueAgainst, message, label, labelAgainst, replacePairs;
                fieldAgainst = this.getAgainst();
                value = validation.getValue(field);
                valueAgainst = validation.getValue(fieldAgainst);
                if (!this.compare(value, valueAgainst)) {
                    label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    labelAgainst = this.getLabelAgainst();
                    if (!labelAgainst) {
                        labelAgainst = validation.getLabel(fieldAgainst);
                    }
                    message = this.getMessage();
                    replacePairs = [':field', label, ':against', labelAgainst];
                    if (!message) {
                        message = validation.getDefaultMessage('Confirmation');
                    }
                    message.replace(replacePairs[0], replacePairs[1]);
                    message.replace(replacePairs[2], replacePairs[3]);
                    validation.appendMessage(new Message(message, field, 'Confirmation'));
                    return false;
                }
                return true;
            };
            Confirmation.prototype.compare = function (a, b) {
                if (a === void 0) { a = ''; }
                if (b === void 0) { b = ''; }
                if (this.getIgnoreCase()) {
                    return a.toLowerCase() === b.toLowerCase();
                }
                return a === b;
            };
            Confirmation.prototype.ignoreCase = function (ignoreCase) {
                if (ignoreCase === void 0) { ignoreCase = true; }
                this._ignoreCase = ignoreCase;
                return this;
            };
            Confirmation.prototype.getIgnoreCase = function () {
                return this._ignoreCase;
            };
            Confirmation.prototype.against = function (against) {
                this._against = against;
                return this;
            };
            Confirmation.prototype.getAgainst = function () {
                return this._against;
            };
            Confirmation.prototype.labelAgainst = function (labelAgainst) {
                this._labelAgainst = labelAgainst;
                return this;
            };
            Confirmation.prototype.getLabelAgainst = function () {
                return this._labelAgainst;
            };
            return Confirmation;
        })(Validator);
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
                if (this.getAllowEmpty() && this.isEmpty(value)) {
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
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var ExclusionIn = (function (_super) {
            __extends(ExclusionIn, _super);
            function ExclusionIn() {
                _super.apply(this, arguments);
                this._strict = false;
                this._allowEmpty = false;
            }
            ExclusionIn.prototype.validate = function (validation, field) {
                var value, domain, message, label, replacePairs, strict;
                value = validation.getValue(field);
                if (this.getAllowEmpty() && this.isEmpty(value)) {
                    return true;
                }
                domain = this.getDomain();
                if (!_.isArray(domain)) {
                    throw new TSValidate.Exception('Option `domain` must be an array');
                }
                strict = this.getStrict();
                if (this.inArray(value, domain, strict)) {
                    label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [":field", label, ":domain", domain.join(', ')];
                    if (!message) {
                        message = validation.getDefaultMessage('ExclusionIn');
                    }
                    message = message.replace(replacePairs[0], replacePairs[1]);
                    message = message.replace(replacePairs[2], replacePairs[3]);
                    validation.appendMessage(new Message(message, field, "ExclusionIn"));
                    return false;
                }
                return true;
            };
            ExclusionIn.prototype.inArray = function (needle, haystack, strict) {
                var _this = this;
                if (strict === void 0) { strict = false; }
                var inArray = false;
                _.each(haystack, function (part) {
                    if (_this.compare(part, needle, strict)) {
                        inArray = true;
                    }
                });
                return inArray;
            };
            ExclusionIn.prototype.compare = function (a, b, strict) {
                if (_.isObject(a) && _.isObject(b)) {
                    if (strict) {
                        return JSON.stringify(a) === JSON.stringify(b);
                    }
                    return JSON.stringify(a) == JSON.stringify(b);
                }
                if (strict) {
                    return a === b;
                }
                return a == b;
            };
            ExclusionIn.prototype.strict = function (strict) {
                if (strict === void 0) { strict = true; }
                this._strict = strict;
                return this;
            };
            ExclusionIn.prototype.getStrict = function () {
                return this._strict;
            };
            ExclusionIn.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            ExclusionIn.prototype.getAllowEmpty = function () {
                return this._allowEmpty;
            };
            ExclusionIn.prototype.domain = function (domain) {
                this._domain = domain;
                return this;
            };
            ExclusionIn.prototype.getDomain = function () {
                return this._domain;
            };
            return ExclusionIn;
        })(Validator);
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
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var InclusionIn = (function (_super) {
            __extends(InclusionIn, _super);
            function InclusionIn() {
                _super.apply(this, arguments);
                this._strict = false;
                this._allowEmpty = false;
            }
            InclusionIn.prototype.validate = function (validation, field) {
                var value, domain, message, label, replacePairs, strict;
                value = validation.getValue(field);
                if (this.getAllowEmpty() && this.isEmpty(value)) {
                    return true;
                }
                domain = this.getDomain();
                if (!_.isArray(domain)) {
                    throw new TSValidate.Exception('Option `domain` must be an array');
                }
                strict = this.getStrict();
                if (!this.inArray(value, domain, strict)) {
                    label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [":field", label, ":domain", domain.join(', ')];
                    if (!message) {
                        message = validation.getDefaultMessage('ExclusionIn');
                    }
                    message = message.replace(replacePairs[0], replacePairs[1]);
                    message = message.replace(replacePairs[2], replacePairs[3]);
                    validation.appendMessage(new Message(message, field, "ExclusionIn"));
                    return false;
                }
                return true;
            };
            InclusionIn.prototype.inArray = function (needle, haystack, strict) {
                var _this = this;
                if (strict === void 0) { strict = false; }
                var inArray = false;
                _.each(haystack, function (part) {
                    if (_this.compare(part, needle, strict)) {
                        inArray = true;
                    }
                });
                return inArray;
            };
            InclusionIn.prototype.compare = function (a, b, strict) {
                if (_.isObject(a) && _.isObject(b)) {
                    if (strict) {
                        return JSON.stringify(a) === JSON.stringify(b);
                    }
                    return JSON.stringify(a) == JSON.stringify(b);
                }
                if (strict) {
                    return a === b;
                }
                return a == b;
            };
            InclusionIn.prototype.strict = function (strict) {
                if (strict === void 0) { strict = true; }
                this._strict = strict;
                return this;
            };
            InclusionIn.prototype.getStrict = function () {
                return this._strict;
            };
            InclusionIn.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            InclusionIn.prototype.getAllowEmpty = function () {
                return this._allowEmpty;
            };
            InclusionIn.prototype.domain = function (domain) {
                this._domain = domain;
                return this;
            };
            InclusionIn.prototype.getDomain = function () {
                return this._domain;
            };
            return InclusionIn;
        })(Validator);
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
                if (_.isNull(value) || this.isEmpty(value)) {
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
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var Regex = (function (_super) {
            __extends(Regex, _super);
            function Regex() {
                _super.apply(this, arguments);
                this._allowEmpty = false;
            }
            Regex.prototype.validate = function (validation, field) {
                var matches, pattern, message, value, label, replacePairs;
                matches = null;
                value = validation.getValue(field);
                if (this.getAllowEmpty() && this.isEmpty(value)) {
                    return true;
                }
                if (!this.getPattern()) {
                    throw new TSValidate.Exception("No pattern set");
                }
                pattern = this.getPattern();
                if (!pattern.test(value)) {
                    label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [":field", label];
                    if (!message) {
                        validation.getDefaultMessage('Regex');
                    }
                    validation.appendMessage(new Message(message.replace(replacePairs[0], replacePairs[1]), field, 'Regex'));
                    return false;
                }
                return true;
            };
            Regex.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            Regex.prototype.getAllowEmpty = function () {
                return this._allowEmpty;
            };
            Regex.prototype.pattern = function (pattern) {
                this._pattern = pattern;
                return this;
            };
            Regex.prototype.getPattern = function () {
                return this._pattern;
            };
            return Regex;
        })(Validator);
        Validators.Regex = Regex;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var StringLength = (function (_super) {
            __extends(StringLength, _super);
            function StringLength() {
                _super.apply(this, arguments);
                this._allowEmpty = false;
            }
            StringLength.prototype.validate = function (validation, field) {
                var isSetMin, isSetMax, value, length, message, minimum, maximum, label, replacePairs;
                isSetMin = !_.isUndefined(this.getMin());
                isSetMax = !_.isUndefined(this.getMax());
                if (!isSetMin && !isSetMax) {
                    throw new TSValidate.Exception("A minimum or maximum must be set");
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
            };
            StringLength.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            StringLength.prototype.getAllowEmpty = function () {
                return this._allowEmpty;
            };
            StringLength.prototype.min = function (min) {
                this._min = min;
                return this;
            };
            StringLength.prototype.getMin = function () {
                return this._min;
            };
            StringLength.prototype.max = function (max) {
                this._max = max;
                return this;
            };
            StringLength.prototype.getMax = function () {
                return this._max;
            };
            StringLength.prototype.messageMinimum = function (messageMinimum) {
                this._messageMinimum = messageMinimum;
                return this;
            };
            StringLength.prototype.getMessageMinimum = function () {
                return this._messageMinimum;
            };
            StringLength.prototype.messageMaximum = function (messageMaximum) {
                this._messageMaximum = messageMaximum;
                return this;
            };
            StringLength.prototype.getMessageMaximum = function () {
                return this._messageMaximum;
            };
            return StringLength;
        })(Validator);
        Validators.StringLength = StringLength;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Validators;
    (function (Validators) {
        var Validator = TSValidate.Validator;
        var Message = TSValidate.Message;
        var Url = (function (_super) {
            __extends(Url, _super);
            function Url() {
                _super.apply(this, arguments);
                this._allowEmpty = false;
            }
            Url.prototype.validate = function (validation, field) {
                var value, message, label, replacePairs;
                value = validation.getValue(field);
                if (this.getAllowEmpty() && this.isEmpty(value)) {
                    return true;
                }
                if (!Url.URL_REGEX.test(value)) {
                    label = this.getLabel();
                    if (!label) {
                        label = validation.getLabel(field);
                    }
                    message = this.getMessage();
                    replacePairs = [':field', label];
                    if (!message) {
                        message = validation.getDefaultMessage('Url');
                    }
                    message.replace(replacePairs[0], replacePairs[1]);
                    validation.appendMessage(new Message(message, field, 'Url'));
                    return false;
                }
                return true;
            };
            Url.prototype.allowEmpty = function (allowEmpty) {
                if (allowEmpty === void 0) { allowEmpty = true; }
                this._allowEmpty = allowEmpty;
                return this;
            };
            Url.prototype.getAllowEmpty = function () {
                return this._allowEmpty;
            };
            Url.URL_REGEX = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
            return Url;
        })(Validator);
        Validators.Url = Url;
    })(Validators = TSValidate.Validators || (TSValidate.Validators = {}));
})(TSValidate || (TSValidate = {}));
var TSValidate;
(function (TSValidate) {
    var Between = TSValidate.Validators.Between;
    var Confirmation = TSValidate.Validators.Confirmation;
    var Email = TSValidate.Validators.Email;
    var ExclusionIn = TSValidate.Validators.ExclusionIn;
    var Identical = TSValidate.Validators.Identical;
    var PresenceOf = TSValidate.Validators.PresenceOf;
    var Regex = TSValidate.Validators.Regex;
    var StringLength = TSValidate.Validators.StringLength;
    var Url = TSValidate.Validators.Url;
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
        Validation.prototype.presenceOf = function (field, message) {
            this.add(field, new PresenceOf()
                .message(message));
            return this;
        };
        Validation.prototype.identical = function (field, accepted, message) {
            if (accepted === void 0) { accepted = true; }
            this.add(field, new Identical()
                .accepted(accepted)
                .message(message));
            return this;
        };
        Validation.prototype.email = function (field, message) {
            this.add(field, new Email()
                .message(message));
            return this;
        };
        Validation.prototype.exclusionIn = function (field, domain, message) {
            this.add(field, new ExclusionIn()
                .domain(domain)
                .message(message));
            return this;
        };
        Validation.prototype.inclusionIn = function (field, domain, message) {
            this.add(field, new ExclusionIn()
                .domain(domain)
                .message(message));
            return this;
        };
        Validation.prototype.regex = function (field, pattern, message) {
            this.add(field, new Regex()
                .pattern(pattern)
                .message(message));
            return this;
        };
        Validation.prototype.stringLength = function (field, min, max, messageMinimum, messageMaximum) {
            this.add(field, new StringLength()
                .min(min)
                .max(max)
                .messageMinimum(messageMinimum)
                .messageMaximum(messageMaximum));
            return this;
        };
        Validation.prototype.between = function (field, minimum, maximum, message) {
            this.add(field, new Between()
                .minimum(minimum)
                .maximum(maximum)
                .message(message));
            return this;
        };
        Validation.prototype.confirmation = function (field, against, message) {
            this.add(field, new Confirmation()
                .against(against)
                .message(message));
            return this;
        };
        Validation.prototype.url = function (field, message) {
            this.add(field, new Url()
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
//# sourceMappingURL=ts-validate.js.map
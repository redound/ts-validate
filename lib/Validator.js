"use strict";
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
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Validator;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Exception_1 = require("ts-core/lib/Exceptions/Exception");
var Message_1 = require("../Message");
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
            throw new Exception_1.default("A minimum or maximum must be set");
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
                validation.appendMessage(new Message_1.default(message, field, 'TooLong'));
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
                validation.appendMessage(new Message_1.default(message, field, "TooShort"));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringLength;

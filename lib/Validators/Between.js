"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Message_1 = require("../Message");
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
            validation.appendMessage(new Message_1.default(message, field, 'Between'));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Between;

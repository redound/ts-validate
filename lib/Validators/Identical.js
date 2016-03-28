"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Message_1 = require("../Message");
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
            validation.appendMessage(new Message_1.default(message.replace(replacePairs[0], replacePairs[1]), field, 'Identical'));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Identical;

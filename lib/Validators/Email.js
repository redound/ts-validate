"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Message_1 = require("../Message");
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
            validation.appendMessage(new Message_1.default(message.replace(replacePairs[0], replacePairs[1]), field, 'Email'));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Email;

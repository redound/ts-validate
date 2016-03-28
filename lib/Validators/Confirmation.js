"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Message_1 = require("../Message");
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
            validation.appendMessage(new Message_1.default(message, field, 'Confirmation'));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Confirmation;

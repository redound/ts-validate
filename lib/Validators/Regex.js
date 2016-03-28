"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Exception_1 = require("ts-core/lib/Exceptions/Exception");
var Message_1 = require("../Message");
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
            throw new Exception_1.default("No pattern set");
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
            validation.appendMessage(new Message_1.default(message.replace(replacePairs[0], replacePairs[1]), field, 'Regex'));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Regex;

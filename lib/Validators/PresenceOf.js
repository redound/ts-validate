"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Message_1 = require("../Message");
var _ = require("underscore");
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
            validation.appendMessage(new Message_1.default(message.replace(replacePairs[0], replacePairs[1]), field, 'PresenceOf'));
            return false;
        }
        return true;
    };
    return PresenceOf;
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PresenceOf;

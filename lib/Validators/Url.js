"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Message_1 = require("../Message");
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
            validation.appendMessage(new Message_1.default(message, field, 'Url'));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Url;

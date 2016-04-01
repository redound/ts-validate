"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require("../Validator");
var Exception_1 = require("ts-core/lib/Exceptions/Exception");
var Message_1 = require("../Message");
var _ = require("underscore");
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
            throw new Exception_1.default('Option `domain` must be an array');
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
            validation.appendMessage(new Message_1.default(message, field, "ExclusionIn"));
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
}(Validator_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InclusionIn;

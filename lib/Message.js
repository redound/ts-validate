"use strict";
var Message = (function () {
    function Message(message, field, type, code) {
        if (type === void 0) { type = null; }
        if (code === void 0) { code = null; }
        this._message = message;
        this._field = field;
        this._type = type;
        this._code = code;
    }
    Message.prototype.setType = function (type) {
        this._type = type;
        return this;
    };
    Message.prototype.getType = function () {
        return this._type;
    };
    Message.prototype.setMessage = function (message) {
        this._message = message;
        return this;
    };
    Message.prototype.getMessage = function () {
        return this._message;
    };
    Message.prototype.setField = function (field) {
        this._field = field;
        return this;
    };
    Message.prototype.getField = function () {
        return this._field;
    };
    Message.prototype.toString = function () {
        return this._message;
    };
    return Message;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Message;

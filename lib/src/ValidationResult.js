"use strict";
var ValidationResult = (function () {
    function ValidationResult() {
        this._messages = [];
    }
    ValidationResult.prototype.addMessage = function (message) {
        this._messages.push(message);
        return this;
    };
    Object.defineProperty(ValidationResult.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "isValid", {
        get: function () {
            return this.messages.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    ValidationResult.prototype.messagesFor = function (property) {
        return this._messages.filter(function (m) { return m.property(m.object) === property(m.object); })
            .map(function (m) { return m.message; });
    };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;

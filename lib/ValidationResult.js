"use strict";
var ValidationResult = (function () {
    function ValidationResult() {
        this.messages = [];
    }
    Object.defineProperty(ValidationResult.prototype, "isValid", {
        get: function () {
            return this.messages.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;

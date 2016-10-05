/// <reference path="../typings/index.d.ts" />
"use strict";
var ValidationResult = (function () {
    function ValidationResult() {
        this._messages = [];
        this._messagesFor = {
            messagesForObj: []
        };
    }
    ValidationResult.prototype.addMessage = function (message) {
        this._messages.push(message);
        try {
            var messagesForProp = message.property(this._messagesFor);
            if (messagesForProp === this._messagesFor) {
                messagesForProp = this._messagesFor.messagesForObj;
            }
            messagesForProp = messagesForProp ? messagesForProp : [];
            messagesForProp.push(message.message);
        }
        catch (err) {
            throw new Error("Cannot validate for properties of child objects: property = " + message.property.toString());
        }
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
        var messagesForProp = property(this._messagesFor);
        return messagesForProp ? messagesForProp : [];
    };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;

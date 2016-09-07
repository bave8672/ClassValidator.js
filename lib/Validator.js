"use strict";
var ValidationResult_1 = require('./ValidationResult');
var ValidationMessage_1 = require('./ValidationMessage');
var ValidationRule_1 = require('./ValidationRule');
var Validator = (function () {
    function Validator(name) {
        this.rules = [];
        this.name = name;
    }
    Validator.prototype.rule = function (message, ruleFn) {
        return this.ruleFor(function (obj) { return obj; }, message, ruleFn);
    };
    Validator.prototype.ruleFor = function (property, message, ruleFn) {
        var rule = new ValidationRule_1.ValidationRule();
        rule.property = property;
        rule.message = message;
        rule.ruleFn = ruleFn;
        this.rules.push(rule);
        return this;
    };
    Validator.prototype.validate = function (obj) {
        var validationResult = new ValidationResult_1.ValidationResult();
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            var validationMessage = this.validateForRule(obj, rule);
            if (validationMessage != null) {
                validationResult.messages.push(validationMessage);
            }
        }
        return validationResult;
    };
    Validator.prototype.isValid = function (obj) {
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            var validationMessage = this.validateForRule(obj, rule);
            if (validationMessage != null) {
                return false;
            }
        }
        return true;
    };
    Validator.prototype.validateForRule = function (obj, rule) {
        var validationMessage;
        try {
            var prop = rule.property(obj);
            var isValid = rule.ruleFn(prop);
            if (isValid === false) {
                validationMessage = new ValidationMessage_1.ValidationMessage();
            }
        }
        catch (error) {
            validationMessage = new ValidationMessage_1.ValidationMessage();
            validationMessage.error = error;
        }
        if (validationMessage != null) {
            validationMessage.message = rule.message;
            validationMessage.property = rule.property;
        }
        return validationMessage;
    };
    return Validator;
}());
exports.Validator = Validator;

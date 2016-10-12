"use strict";
var Validator_1 = require('../src/Validator');
var CreditCardDetails = (function () {
    function CreditCardDetails() {
    }
    return CreditCardDetails;
}());
var testCC;
var CCValidator;
describe('Validator', function () {
    beforeEach(function () {
        testCC = {
            name: 'David Icke',
            number: 4444333322221111,
            expirationDate: new Date()
        };
        CCValidator = new Validator_1.Validator();
    });
    it('Should be newable', function () {
        var numberValidator = new Validator_1.Validator();
        expect(numberValidator).toBeTruthy();
    });
    it('Can have a name', function () {
        var nameValidator = new Validator_1.Validator('name');
        expect(nameValidator.name).toBe('name');
    });
    it('Should not validate without any validators', function () {
        var validationResult = CCValidator.validate(testCC);
        expect(validationResult.isValid).toEqual(true);
    });
    it('Should not validate without any validators', function () {
        CCValidator.rule('It should be truthy', function (cc) { return !!cc; });
        var validationResult = CCValidator.validate(testCC);
        expect(validationResult.isValid).toEqual(true);
    });
    it('Can add validators fluidly', function () {
        CCValidator.rule('It should be truthy', function (cc) { return !!cc; })
            .ruleFor(function (cc) { return cc.name; }, 'Please enter the name on this card', function (name) { return !!name; })
            .ruleFor(function (cc) { return cc.number; }, 'Please enter a number', function (n) { return !!n; })
            .ruleFor(function (cc) { return cc.expirationDate; }, 'Please enter the expiration date for this card', function (d) { return !!d; });
        var validationResult = CCValidator.validate(testCC);
        expect(validationResult.isValid).toEqual(true);
    });
    it('Can validate using a false return value', function () {
        CCValidator.ruleFor(function (cc) { return cc.expirationDate; }, 'Expiration date cannot be in the past', function (d) { return d > new Date(); });
        var validationResult = CCValidator.validate(testCC);
        expect(validationResult.isValid).toEqual(false);
    });
    it('Returns messages to results', function () {
        CCValidator.ruleFor(function (cc) { return cc.expirationDate; }, 'Expiration date cannot be in the past', function (d) { return d > new Date(); });
        var validationResult = CCValidator.validate(testCC);
        expect(validationResult.isValid).toEqual(false);
        expect(validationResult.messages.length).toEqual(1);
        expect(validationResult.messages[0].message).toBe('Expiration date cannot be in the past');
        expect(validationResult.messagesFor(function (cc) { return cc.expirationDate; })).toEqual(['Expiration date cannot be in the past']);
    });
    it('Can validate by throwing an error', function () {
        var err = new Error();
        CCValidator.rule('throw error always', function (cc) { throw err; });
        var validationResult = CCValidator.validate(testCC);
        expect(validationResult.isValid).toEqual(false);
        expect(validationResult.messages[0].error).toBe(err);
    });
    it('Can add validators to properties', function () {
        var Tiara = (function () {
            function Tiara() {
            }
            return Tiara;
        }());
        var Manufacturer = (function () {
            function Manufacturer() {
            }
            return Manufacturer;
        }());
        var manufacturerValidator = new Validator_1.Validator();
        manufacturerValidator.rule('Manufacturer must be defined', function (m) { return expect(m).toBeDefined(); });
        manufacturerValidator.ruleFor(function (m) { return m.name; }, 'Name must be defined', function (n) { return expect(n.length).toBeGreaterThan(0); });
        manufacturerValidator.ruleFor(function (m) { return m.postcode; }, 'PostCode must be greater than 1999', function (pc) { throw new Error(); });
        var tiaraValidator = new Validator_1.Validator();
        tiaraValidator.childValidatorFor(function (t) { return t.manufacturer; }, manufacturerValidator);
        var tiara = new Tiara();
        tiara.color = 'Pearl';
        tiara.manufacturer = new Manufacturer();
        tiara.manufacturer.name = '';
        tiara.manufacturer.postcode = 1999;
        var validationResult = tiaraValidator.validate(tiara);
        tiaraValidator._rules.forEach(function (r) {
            console.log(r.ruleFn.toString());
        });
        expect(validationResult.messages.length).toBe(1);
        expect(validationResult.messages[0].message).toBe('Name must be defined');
    });
});

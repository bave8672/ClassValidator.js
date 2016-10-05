/// <reference path="../typings/index.d.ts" />

import { Validator } from '../src/Validator';

class CreditCardDetails {
    name: string;
    number: number;
    expirationDate: Date;
}

var testCC: CreditCardDetails;
var CCValidator: Validator<CreditCardDetails>;

describe('Validator', () => {

    beforeEach(() => {
        testCC = {
            name: 'David Icke',
            number: 4444333322221111,
            expirationDate: new Date()
        };

        CCValidator = new Validator<CreditCardDetails>();
    });

    it('Should be newable', () => {
       let numberValidator = new Validator<number>();

       expect(numberValidator).toBeTruthy();
    });

    it('Can have a name', () => {
        let nameValidator = new Validator<any>('name');

        expect(nameValidator.name).toBe('name');
    });

    it('Should not validate without any validators', () => {
        let validationResult = CCValidator.validate(testCC);

        expect(validationResult.isValid).toEqual(true);
    });

    it('Should not validate without any validators', () => {
        CCValidator.rule('It should be truthy', cc => !!cc);
        let validationResult = CCValidator.validate(testCC);

        expect(validationResult.isValid).toEqual(true);
    });

    it('Can add validators fluidly', () => {
        CCValidator.rule('It should be truthy', cc => !!cc)
            .ruleFor(cc => cc.name, 'Please enter the name on this card', name => !!name)
            .ruleFor(cc => cc.number, 'Please enter a number', n => !!n)
            .ruleFor(cc => cc.expirationDate, 'Please enter the expiration date for this card', d => !!d);

        let validationResult = CCValidator.validate(testCC);

        expect(validationResult.isValid).toEqual(true);
    });

    it('Can validate using a false return value', () => {
        CCValidator.ruleFor(cc => cc.expirationDate, 'Expiration date cannot be in the past', d => d > new Date());

        let validationResult = CCValidator.validate(testCC);

        expect(validationResult.isValid).toEqual(false);
    });

    it('Returns messages to results', () => {
        CCValidator.ruleFor(cc => cc.expirationDate, 'Expiration date cannot be in the past', d => d > new Date());

        let validationResult = CCValidator.validate(testCC);

        expect(validationResult.isValid).toEqual(false);
        expect(validationResult.messages.length).toEqual(1);
        expect(validationResult.messages[0].message).toBe('Expiration date cannot be in the past');
   
        expect(validationResult.messagesFor(cc => cc.expirationDate)).toEqual(['Expiration date cannot be in the past']);
    });

    it('Can validate by throwing an error', () => {
        let err = new Error();
        CCValidator.rule('throw error always', cc => { throw err; });

        let validationResult = CCValidator.validate(testCC);

        expect(validationResult.isValid).toEqual(false);
        expect(validationResult.messages[0].error).toBe(err);
    });
});



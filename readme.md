# ClassValidator.js

A library for Object-Oriented style validation in JavaScript/TypeScript

### Creating a validator for a class

```
// Class we want to create a validator for:
class CreditCardDetails {
    name: string;
    number: number;
    expirationDate: Date;
}

// Create a validator for that class:
CCValidator = new Validator<CreditCardDetails>();
```

### Adding rules

```
// Validation rules can be any function
// They take the object instance as a parameter
// They will pass if the function returns any value that is not false (null is fine).
// They will fail if you throw an error.
CCValidator.rule('It should be truthy', cc => !!cc)
CCValidator.rule('It should still be truthy', cc => !!cc ? thow new Error('Rule functions can fail by throwing errors.') : null;

// We can also add rules for class properties
// .rule() and .ruleFor() return the validator for fluency.
CCValidator.ruleFor(cc => cc.name, 'Please enter the name on this card', name => !!name)
        .ruleFor(cc => cc.number, 'Please enter a number', n => !!n)
        .ruleFor(cc => cc.expirationDate, 'Please enter the expiration date for this card', d => !!d)
        .ruleFor(cc => cc.expirationDate, 'Expiration date cannot be in the past', d => d > new Date());
```

### Running your validator

```
// Instance of the class we want to validate
let testCC: CreditCardDetails = {
    name: 'David Icke',
    number: 4444333322221111,
    expirationDate: new Date()
};

// Run the validator
let validationResult = CCValidator.validate(testCC);

expect(validationResult.isValid).toEqual(false);
expect(validationResult.messages[0].message).toBe('Expiration date cannot be in the past');
```
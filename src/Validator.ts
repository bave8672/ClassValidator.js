/// <reference path="../typings/index.d.ts" />

import * as Valid from './interfaces/validator';
import { ValidationResult } from './ValidationResult';
import { ValidationMessage } from './ValidationMessage';
import { ValidationRule } from './ValidationRule';

class Validator<T> implements Valid.Validator<T> {

    public name: string;
    private _rules: Valid.IRuleFor<T, any>[] = [];

    constructor(name?: string) {
        this.name = name;
    }

    rule(
        message: string,
        ruleFn: {(obj: T): boolean | void; }
    ): Validator<T> {
        return this.ruleFor(obj => obj, message, ruleFn);
    }

    rules(ruleDefinitions: {
        message: string;
        ruleFn: { (obj: T): boolean | void; }}[]
    ): Validator<T> {
        ruleDefinitions.forEach(r => this.rule(r.message, r.ruleFn));
        return this;
    }

    ruleFor<TProp>(
        property: {(obj: T): TProp},
        message: string,
        ruleFn: {(prop: TProp): boolean | void; }
    ): Validator<T> {
        let rule = new ValidationRule<T, TProp>();

        rule.property = property;
        rule.message = message;
        rule.ruleFn = ruleFn;

        this._rules.push(rule);
        return this;
    }

    rulesFor<TProp>(
        property: { (obj: T): TProp},
        ruleDefinitions: Valid.IRule<TProp>[]
    ) {
        ruleDefinitions.forEach(r => this.ruleFor(property, r.message, r.ruleFn));
        return this;
    }

    validate(obj: T): Valid.IValidationResult<T> {

        let validationResult = new ValidationResult<T>();

        for (let rule of this._rules) {
            let validationMessage = this.validateForRule(obj, rule);

            if (validationMessage != null) {
                validationResult.addMessage(validationMessage);
            }
        }

        return validationResult;
    }

    isValid(obj: T): boolean {
        for (let rule of this._rules) {
            let validationMessage = this.validateForRule(obj, rule);

            if (validationMessage != null) {
                return false;
            }
        }

        return true;
    }

    private validateForRule<TProp>(obj: T, rule: Valid.IRuleFor<T, TProp>): Valid.IValidationMessage<T, TProp> {
        let validationMessage: ValidationMessage<T, TProp>;

        try {
            let prop = rule.property(obj);
            let isValid = rule.ruleFn(prop);

            if (isValid === false) {
                validationMessage = new ValidationMessage<T, TProp>();
            }
        } catch (error) {
            validationMessage = new ValidationMessage<T, TProp>();
            validationMessage.error = error;
        }

        if (validationMessage != null) {
            validationMessage.message = rule.message;
            validationMessage.property = rule.property;
        }

        return validationMessage;
    }
}

export { Validator };

/// <reference path="../../typings/index.d.ts" />
import * as Valid from './interfaces/validator';
declare class Validator<T> implements Valid.Validator<T> {
    name: string;
    private _rules;
    constructor(name?: string);
    rule(message: string, ruleFn: {
        (obj: T): boolean | void;
    }): Validator<T>;
    rules(ruleDefinitions: {
        message: string;
        ruleFn: {
            (obj: T): boolean | void;
        };
    }[]): Validator<T>;
    ruleFor<TProp>(property: {
        (obj: T): TProp;
    }, message: string, ruleFn: {
        (prop: TProp): boolean | void;
    }): Validator<T>;
    rulesFor<TProp>(property: {
        (obj: T): TProp;
    }, ruleDefinitions: Valid.IRule<TProp>[]): this;
    validate(obj: T): Valid.IValidationResult<T>;
    isValid(obj: T): boolean;
    private validateForRule(obj, rule);
}
export { Validator };

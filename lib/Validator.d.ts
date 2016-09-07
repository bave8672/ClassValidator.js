/// <reference path="../typings/index.d.ts" />
import * as Valid from './interfaces/validator';
declare class Validator<T> implements Valid.Validator<T> {
    name: string;
    rules: Valid.IRuleFor<T, any>[];
    constructor(name?: string);
    rule(message: string, ruleFn: {
        (obj: T): boolean | void;
    }): Validator<T>;
    ruleFor<TProp>(property: {
        (obj: T): TProp;
    }, message: string, ruleFn: {
        (prop: TProp): boolean | void;
    }): Validator<T>;
    validate(obj: T): Valid.IValidationResult<T>;
    isValid(obj: T): boolean;
    private validateForRule(obj, rule);
}
export { Validator };

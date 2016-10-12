import { IRule, IRuleFor, IValidationResult } from './index';

export interface IValidator<T> {

    name: string;
    _rules: IRuleFor<T, any>[];

    childValidatorFor<TProp>(
        property: { (obj: T): TProp},
        validator: IValidator<TProp>
    ): IValidator<T>;

    rule(
        message: string,
        ruleFn: { (obj: T): boolean | void; }
    ): IValidator<T>;

    rules(ruleDefinitions: IRule<T>[]): IValidator<T>;

    ruleFor<TProp>(
        property: { (obj: T): TProp},
        message: string,
        ruleFn: { (prop: TProp): boolean | void; }
    ): IValidator<T>;

    rulesFor<TProp>(
        property: { (obj: T): TProp},
        ruleDefinitions: IRule<TProp>[]
    ): IValidator<T>;

    validate(obj: T): IValidationResult<T>;

    isValid(obj: T): boolean;
}

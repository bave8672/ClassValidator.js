export interface IValidator<T> {
    new(name?: string): Validator<T>;
}

export interface Validator<T> {
    rule(
        message: string,
        ruleFn: { (obj: T): boolean | void; }
    ): Validator<T>;
    rules(ruleDefinitions: IRule<T>[]): Validator<T>;
    ruleFor<TProp>(
        property: { (obj: T): TProp},
        message: string,
        ruleFn: { (prop: TProp): boolean | void; }
    ): Validator<T>;
    rulesFor<TProp>(
        property: { (obj: T): TProp},
        ruleDefinitions: IRule<TProp>[]
    ): Validator<T>;
    validate(obj: T): IValidationResult<T>;
    isValid(obj: T): boolean;
}

export interface IRule<T> {
    message: string;
    ruleFn: {(obj: T): boolean | void; };
}

export interface IRuleFor<T, TProp> {
    property: {(obj: T): TProp};
    message: string;
    ruleFn: {(prop: TProp): boolean | void; };
}

export interface IValidationResult<T> {
    isValid: boolean;
    messages: IValidationMessage<T, any>[];
}

export interface IValidationMessage<T, TProp> {
    error?: any;
    message: string;
    property: { (obj: T): TProp};
}

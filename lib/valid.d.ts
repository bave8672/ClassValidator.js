declare module 'valid/src/interfaces/validator' {
	export interface IValidator<T> {
	    new(name?: string): Validator<T>;
	}

	export interface Validator<T> {
	    rule(
	        message: string,
	        ruleFn: {(obj: T): boolean | void; }
	    ): Validator<T>;
	    ruleFor<TProp>(
	        property: {(obj: T): TProp},
	        message: string,
	        ruleFn: {(prop: TProp): boolean | void; }
	    ): Validator<T>;
	    validate(obj: T): IValidationResult<T>;
	    isValid(obj: T): boolean;
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
	    property: {(obj: T): TProp};
	}

}
declare module 'valide' {
	/// <reference path="../typings/index.d.ts" />
	import * as Valid from 'interfaces/validator'; class ValidationMessage<T, TProp> implements Valid.IValidationMessage<T, TProp> {
	    message: string;
	    property: {
	        (obj: T): TProp;
	    };
	    error: any;
	}
	export { ValidationMessage };

}
declare module 'valid' {
	/// <reference path="../typings/index.d.ts" />
	import * as Valid from 'interfaces/validator'; class ValidationResult<T> implements Valid.IValidationResult<T> {
	    messages: Valid.IValidationMessage<T, any>[];
	    isValid: boolean;
	}
	export { ValidationResult };

}
declare module 'valid' {
	/// <reference path="../typings/index.d.ts" />
	import * as Valid from 'interfaces/validator'; class ValidationRule<T, TProp> implements Valid.IRuleFor<T, TProp> {
	    property: {
	        (obj: T): TProp;
	    };
	    ruleFn: {
	        (prop: TProp): any;
	    };
	    message: string;
	}
	export { ValidationRule };

}
declare module 'valid' {
	/// <reference path="../typings/index.d.ts" />
	import * as Valid from 'interfaces/validator'; class Validator<T> implements Valid.Validator<T> {
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

}

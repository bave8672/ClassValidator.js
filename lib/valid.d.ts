declare module 'valid/src/interfaces/validator' {
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
	    addMessage(message: IValidationMessage<T, any>): IValidationResult<T>;
	    messagesFor(property: { (obj: T): any; }): string[];
	    isValid: boolean;
	    messages: IValidationMessage<T, any>[];
	}

	export interface IValidationMessage<T, TProp> {
	    error?: any;
	    message: string;
	    property: { (obj: T): TProp};
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
	    _messages: Valid.IValidationMessage<T, any>[];
	    _messagesFor: any;
	    addMessage(message: Valid.IValidationMessage<T, any>): this;
	    messages: Valid.IValidationMessage<T, any>[];
	    isValid: boolean;
	    messagesFor(property: {
	        (obj: T): any;
	    }): string[];
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

}

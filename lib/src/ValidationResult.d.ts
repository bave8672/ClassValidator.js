/// <reference path="../../typings/index.d.ts" />
import * as Valid from './interfaces/validator';
declare class ValidationResult<T> implements Valid.IValidationResult<T> {
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

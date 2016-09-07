/// <reference path="../typings/index.d.ts" />
import * as Valid from './interfaces/validator';
declare class ValidationResult<T> implements Valid.IValidationResult<T> {
    messages: Valid.IValidationMessage<T, any>[];
    isValid: boolean;
}
export { ValidationResult };

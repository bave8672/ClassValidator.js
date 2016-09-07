/// <reference path="../typings/index.d.ts" />

import * as Valid from './interfaces/validator';

class ValidationResult<T> implements Valid.IValidationResult<T> {
    messages: Valid.IValidationMessage<T, any>[] = [];

    public get isValid() {
        return this.messages.length === 0;
    }
}

export { ValidationResult };

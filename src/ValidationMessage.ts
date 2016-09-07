/// <reference path="../typings/index.d.ts" />

import * as Valid from './interfaces/validator';

class ValidationMessage<T, TProp> implements Valid.IValidationMessage<T, TProp> {
    message: string;
    property: {(obj: T): TProp};
    error: any;
}

export { ValidationMessage };

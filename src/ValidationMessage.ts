/// <reference path="../typings/index.d.ts" />

import { IValidationMessage } from './interfaces';

class ValidationMessage<T, TProp> implements IValidationMessage<T, TProp> {
    object: T;
    message: string;
    property: {(obj: T): TProp};
    error: any;
}

export { ValidationMessage };

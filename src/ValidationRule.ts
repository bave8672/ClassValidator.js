/// <reference path="../typings/index.d.ts" />

import * as Valid from './interfaces/validator';

class ValidationRule<T, TProp> implements Valid.IRuleFor<T, TProp> {
    property: {(obj: T): TProp};
    ruleFn: {(prop: TProp): any};
    message: string;
}

export { ValidationRule };

/// <reference path="../typings/index.d.ts" />

import { IRuleFor } from './interfaces';

class ValidationRule<T, TProp> implements IRuleFor<T, TProp> {
    property: {(obj: T): TProp};
    ruleFn: {(prop: TProp): boolean | void};
    message: string;
}

export { ValidationRule };

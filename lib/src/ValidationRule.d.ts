/// <reference path="../../typings/index.d.ts" />
import * as Valid from './interfaces/validator';
declare class ValidationRule<T, TProp> implements Valid.IRuleFor<T, TProp> {
    property: {
        (obj: T): TProp;
    };
    ruleFn: {
        (prop: TProp): any;
    };
    message: string;
}
export { ValidationRule };

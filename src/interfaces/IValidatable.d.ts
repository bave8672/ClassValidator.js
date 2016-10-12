import { IValidationResult } from './IValidationResult';

export interface IValidatable<T> {
    validate(): IValidationResult<T>;
    isValid(): boolean;
}

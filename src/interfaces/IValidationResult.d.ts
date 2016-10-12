import { IValidationMessage } from './IValidationMessage';

export interface IValidationResult<T> {
    addMessage(message: IValidationMessage<T, any>): IValidationResult<T>;
    messagesFor(property: { (obj: T): any; }): string[];
    isValid: boolean;
    messages: IValidationMessage<T, any>[];
}

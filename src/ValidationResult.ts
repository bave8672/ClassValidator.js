/// <reference path="../typings/index.d.ts" />

import { IValidationResult, IValidationMessage } from './interfaces';

class ValidationResult<T> implements IValidationResult<T> {

    _messages: IValidationMessage<T, any>[] = [];

    addMessage(message: IValidationMessage<T, any>) {
        this._messages.push(message);

        return this;
    }

    public get messages() {
        return this._messages;
    }

    public get isValid() {
        return this.messages.length === 0;
    }

    public messagesFor(property: {(obj: T): any}): string[] {
        return this._messages.filter(m => m.property(m.object) === property(m.object))
            .map(m => m.message);
    }
}

export { ValidationResult };

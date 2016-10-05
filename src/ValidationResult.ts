/// <reference path="../typings/index.d.ts" />

import * as Valid from './interfaces/validator';

class ValidationResult<T> implements Valid.IValidationResult<T> {

    _messages: Valid.IValidationMessage<T, any>[] = [];

    addMessage(message: Valid.IValidationMessage<T, any>) {
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
        return this._messages.filter(m => m.property.toString() === property.toString())
            .map(m => m.message);
    }
}

export { ValidationResult };

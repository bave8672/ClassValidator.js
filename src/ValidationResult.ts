/// <reference path="../typings/index.d.ts" />

import * as Valid from './interfaces/validator';

class ValidationResult<T> implements Valid.IValidationResult<T> {

    _messages: Valid.IValidationMessage<T, any>[] = [];
    _messagesFor: any = {
        messagesForObj: []
    };

    addMessage(message: Valid.IValidationMessage<T, any>) {
        this._messages.push(message);

        try {
            let messagesForProp: any = message.property(this._messagesFor);
            if (messagesForProp === this._messagesFor) {
                messagesForProp = this._messagesFor.messagesForObj;
            }
            messagesForProp = messagesForProp ? messagesForProp : [];
            messagesForProp.push(message.message);
        } catch (err) {
            throw new Error(`Cannot validate for properties of child objects: property = ${message.property.toString()}`);
        }

        return this;
    }

    public get messages() {
        return this._messages;
    }

    public get isValid() {
        return this.messages.length === 0;
    }

    public messagesFor(property: {(obj: T): any}): string[] {
        let messagesForProp = property(this._messagesFor);
        return messagesForProp ? messagesForProp : [];
    }
}

export { ValidationResult };

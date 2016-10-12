export interface IValidationMessage<T, TProp> {
    object: T;
    error?: any;
    message: string;
    property: { (obj: T): TProp; };
}

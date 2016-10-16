export interface IRule<T> {
    message: string;
    ruleFn: { (obj: T): boolean | void; };
}

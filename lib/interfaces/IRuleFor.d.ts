export interface IRuleFor<T, TProp> {
    property: {(obj: T): TProp};
    message: string;
    ruleFn: {(prop: TProp): boolean | void; };
}

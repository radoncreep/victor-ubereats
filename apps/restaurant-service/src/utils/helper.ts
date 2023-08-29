export function isEmpty<T extends any[] | Record<any, any> | string>(arg: T): boolean {
    if (Array.isArray(arg) || typeof arg === "string") return arg.length === 0;

    if (typeof arg === "object") return Object.keys(arg).length === 0;

    return true;
}
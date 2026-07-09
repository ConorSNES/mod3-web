/* 
Convenience helper. Executes callback after a given delay.
*/

export default function delay<T>(
    ms: number,
    callback?: (resolve: (v: T | PromiseLike<T>) => void) => void
): Promise<T> {
    callback ??= () => { };
    return new Promise((resolve) => setTimeout(() => callback(resolve), ms));
}
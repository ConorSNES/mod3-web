/* 
Interface class wrapping one value's access from browser storage (local storage).
*/

export class BrowserStored<T> {
    public readonly key : string;
    public readonly default_val : T;
    public readonly parser : (v : string | null) => T | null;

    public constructor(key: string, default_val : T, parser : (v : string | null) => T | null) {
        this.key = key;
        this.default_val = default_val;
        this.parser = parser;
    }

    public static new_string(key: string, default_val : string) : BrowserStored<string> {
        return new BrowserStored(key, default_val, (v)=>v);
    }

    public set value(v : T) {
        if (!localStorage) throw "localStorage must be resolved before set is functioning!";
        localStorage.setItem(this.key, `${v}`);
    }

    public get value() : T {
        if (!localStorage) throw `localStorage is not defined! Defer collection of value ${this.key}!`;
        return this.parser(localStorage.getItem(this.key)) ?? this.default_val;
    }
}
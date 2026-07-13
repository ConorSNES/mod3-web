/* 
Interface class wrapping one value's access from browser storage (local storage).
*/

export class BrowserStored<T> {
    public readonly key : string;
    public readonly default_val : T;
    public readonly deserialiser : (v : string | null) => T | null;
    public readonly serialiser : (v : T) => string = (v) => `${v}`;

    public constructor(
        key: string, default_val : T, 
        parser : (v : string | null) => T | null, 
        serialiser? : (v : T) => string
    ) {
        this.key = key;
        this.default_val = default_val;
        this.deserialiser = parser;
        this.serialiser = serialiser ? serialiser : this.serialiser;
    }

    public static new_string(key: string, default_val : string) : BrowserStored<string> {
        return new BrowserStored(key, default_val, (v)=>v);
    }

    public set value(v : T) {
        if (!localStorage) throw "localStorage must be resolved before set is functioning!";
        localStorage.setItem(this.key, this.serialiser(v));
    }

    public get value() : T {
        if (!localStorage) throw `localStorage is not defined! Defer collection of value ${this.key}!`;
        return this.deserialiser(localStorage.getItem(this.key)) ?? this.default_val;
    }
}
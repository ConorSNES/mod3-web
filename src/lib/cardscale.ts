import Subscription from "./generic/subscription";

export class CardScale {
    private static _scale = 0.8;
    public static set scale(v : number) {
        CardScale._scale = v;
        CardScale.onMut.emit();
    }

    public static get height() {
        return 154 * CardScale._scale;
    }

    public static get width() {
        return 104 * CardScale._scale;
    }

    public static readonly onMut = new Subscription();
}

/* const scale = 0.8;

export const height = 154 * scale;
export const width = 104 * scale; */
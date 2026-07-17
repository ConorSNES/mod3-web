import { createContext } from "svelte";
import { Deck } from "./card_to_image";

interface UserConfig {
    dark_theme: boolean;

    show_timer: boolean;
    show_movecount: boolean;
    show_wincount: boolean;

    prefer_fullscreen: boolean;

    card_scale: number;
    card_deck: Deck;
}

export const default_userconfig = {
    dark_theme: false,

    show_timer: true,
    show_movecount: true,
    show_wincount: true,
    
    prefer_fullscreen: false,

    card_scale: 0.8,
    card_deck: Deck.minimal,
}

export function patch_userconfig(uc : UserConfig) : UserConfig {
    for (const [k, v] of Object.entries(default_userconfig)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!Object.hasOwn(uc, k)) (uc as any)[k] = v;
    }
    return uc;
}

export const [getUserConfig, setUserConfig] = createContext<UserConfig>();
export type { UserConfig };
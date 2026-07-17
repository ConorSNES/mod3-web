import { createContext } from "svelte";

interface UserConfig {
    dark_theme: boolean;
    show_timer: boolean;
    show_movecount: boolean;
    card_scale: number;
    prefer_fullscreen: boolean;
}

export const [getUserConfig, setUserConfig] = createContext<UserConfig>();
export type { UserConfig };
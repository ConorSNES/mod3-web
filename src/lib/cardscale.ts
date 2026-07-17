import { type UserConfig } from "./userconfig";

const [img_height, img_width] = [154, 104];


/**
 * Function collecting card height, derived from user preferences on card scale.
 */
function getHeight(config : UserConfig) {
    return img_height * config.card_scale;
}

/**
 * Function collecting card width, derived from user preferences on card scale.
 */
function getWidth(config : UserConfig) {
    return img_width * config.card_scale;
}


/**
 * Combination of `getHeight()` and `getWidth()` for convenience.
 * 
 * @returns Scale of card in format `[height, width]`. 
 */
function getDimensions(config : UserConfig) : [number, number]  {
    return [getHeight(config), getWidth(config)]
}

export { getHeight, getWidth, getDimensions };
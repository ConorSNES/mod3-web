import type { UserConfig } from "./userconfig";
import * as minimal from "./assets/decks/minimal/card_to_image";
import * as twotone from "./assets/decks/twotone/card_to_image";
import * as fourcolour from "./assets/decks/fourcolour/card_to_image";
import type Card from "./card";

export enum Deck_Style {
    minimal,
    two_tone,
    red,
    four_colours
}

function deck_to_namespace(deck : Deck_Style) {
    switch (deck) {
        case Deck_Style.minimal:
            return minimal;
        case Deck_Style.two_tone:
            return twotone;
        case Deck_Style.four_colours:
            return fourcolour;
        default:
            return minimal;
    }
}

function cfg_to_namespace(cfg : UserConfig) {
    return deck_to_namespace(cfg.card_deck);
}

export function card_to_image(card : Card, cfg : UserConfig) {
    return cfg_to_namespace(cfg).card_to_image(card);
}

export function card_back(cfg : UserConfig) {
    return cfg_to_namespace(cfg).back;
}

export function card_stack(cfg : UserConfig) {
    return cfg_to_namespace(cfg).stack;
}

export function card_position(cfg : UserConfig) {
    return cfg_to_namespace(cfg).position;
}
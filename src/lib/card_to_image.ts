import type { UserConfig } from "./userconfig";
import * as minimal from "./assets/decks/minimal/card_to_image";
import type Card from "./card";

export enum Deck {
    minimal,
    two_tone,
    red,
    four_colours
}

function deck_to_namespace(deck : Deck) {
    switch (deck) {
        case Deck.minimal:
            return minimal;
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
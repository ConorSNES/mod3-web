/*
Definition of the actual game state.
*/

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import type Card from "./card";
import card_deck from "./card_deck";
import { uniformInt } from "pure-rand/distribution/uniformInt";

export type StackState_Row = "ones" | "twos" | "threes" | "random" | "special";
export type StackState_Coord = { v: string, w: string };

export default class GameState {
    public readonly seed: number;

    private stackstate: { [v: string]: { [w: string]: Card[] } } = {
        "ones": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": []
        },
        "twos": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": []
        },
        "threes": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": []
        },
        "random": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": []
        },
        "special": {
            "aces": [],
            "deck": []
        }
    }

    /// Fisher-Yates shuffle algorithm. (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    /// There's no quick prng support, so a library is linked in to avoid browser weirdness (and actually allow seeding).
    /// This also (should ideally) avoid implementing algorithms in js!
    private fisher_yates<T>(value: T[], prng: number): T[] {
        const random = xoroshiro128plus(prng);
        const o = value;
        for (let i = 0; i < o.length; i++) {
            o[uniformInt(random, 0, o.length - 1)] = o[i];
        }
        return o;
    }

    private constructor(seed?: number) {
        this.seed = seed ?? Date.now();
        this.stackstate["special"]["deck"] = this.fisher_yates(card_deck().concat(card_deck()), this.seed);
    }

    public transact(from: StackState_Coord, to: StackState_Coord) {
        this.transact_raw(from.v, from.w, to.v, to.w)
    }

    private transact_raw(from_v: string, from_w: string, to_v: string, to_w: string) {
        // syntax check
        if (!(from_v in this.stackstate)) throw `Bad transfer syntax: transferring from v "${from_v}" cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        if (!(to_v in this.stackstate)) throw `Bad transfer syntax: transferring to v "${to_v}" cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        if (!(from_w in this.stackstate[from_v])) throw `Bad transfer syntax: transferring from w "${from_w}" (within ${from_v}) cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        if (!(to_w in this.stackstate[to_v])) throw `Bad transfer syntax: transferring to w "${to_w}" (within ${to_v}) cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;

        // This can be expanded later to allow the UI to hook into these events.
        const intermediary = this.stackstate[from_v][from_w].pop();
        if (!intermediary) throw `No card in origin stack! (from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        this.stackstate[to_v][to_w].push(intermediary);
    }

    private automation() {
        // All aces are moved to ace stack.
        ["ones", "twos", "threes", "random"].forEach(row=>{
            ["0", "1", "2", "3", "4", "5", "6", "7"].forEach(col=>{
                while (this.stackstate[row][col].at(-1)?.value == 1) {
                    this.transact_raw(row, col, "special", "aces");
                }
            })
        });

        // Empty stacks on "random" row will be refilled from deck.
        ["0", "1", "2", "3", "4", "5", "6", "7"].forEach(col=>{
            // repeat until "random" has a single card or the deck is dry
            while (
                this.stackstate["random"][col].length == 0 &&
                this.stackstate["special"]["deck"].length != 0
            ) {
                // deal a card here
                this.transact_raw("special", "deck", "random", col);
                // if it is an ace, move it to the ace pile
                if (this.stackstate["random"][col].at(-1)?.value == 1) this.transact_raw("random", col, "special", "aces");
            }
        });
    }

    /// First deal of the game;
    private initial_deal() {
        // Deal one card to all stacks.
        ["ones", "twos", "threes", "random"].forEach((row) => {
            ["0", "1", "2", "3", "4", "5", "6", "7"].forEach((col) => {
                this.transact_raw("special", "deck", row, col);
            })
        })
        // Run automation.
        this.automation();
    }

    /// Standard deal from stack to "random" stacks.
    public deal_once() {
        // Deal one card to randoms.
        // tack to (https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break) for showing loop breakage method
        ["0", "1", "2", "3", "4", "5", "6", "7"].some(col=>{
            if (this.stackstate["special"]["deck"].length <= 0) return true;
            this.transact_raw("special", "deck", "random", col);
        });
        // Run automation.
        this.automation();
    }

    /// Returns "quick started" game, where first deal has already occurred and every base has been dealt to with appropriate logic.
    public static quick_start(seed?: number): GameState {
        const o = new GameState(seed);
        o.initial_deal();
        return o;
    }

    /// Collect (hopefully const) row of stacks.
    public get_row(rowid: "ones" | "twos" | "threes" | "random"): { [w: string]: Card[] } {
        return Object.freeze(this.stackstate[rowid]);
    }

    /// Collect comprehensive view of gamestate (excl. aces).
    public get_view(): { [v: string]: { [w: string]: Card[] } } {
        return {
            "ones": this.get_row("ones"),
            "twos": this.get_row("twos"),
            "threes": this.get_row("threes"),
            "random": this.get_row("random")
        }
    }

    /// Collect current array of aces.
    public get_aces(): readonly Card[] {
        return this.stackstate["special"]["aces"];
    }
}
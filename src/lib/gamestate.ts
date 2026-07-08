/*
Definition of the actual game state and logic.
*/

import type Card from "./card";
import card_deck from "./card_deck";
import fisher_yates from "./fisher_yates";

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

    public onMut : () => void = () => {};

    private constructor(seed?: number) {
        this.seed = seed ?? Date.now();
        this.stackstate["special"]["deck"] = fisher_yates(card_deck().concat(card_deck()), this.seed);
    }

    private coord_validate(coord: StackState_Coord): void | never {
        // syntax check
        if (!(coord.v in this.stackstate)) throw `Bad coord syntax: v "${coord.v}" does not exist!\n(${coord.v}.${coord.w})`;
        if (!(coord.w in this.stackstate[coord.v])) throw `Bad coord syntax: w "${coord.w}" (within "${coord.v}") does not exist!\n(${coord.v}.${coord.w})`;
    }

    // convenience functions
    private peek(stack: StackState_Coord): Card | undefined {
        return this.stackstate[stack.v][stack.w].at(-1);
    }

    private peek_len(stack: StackState_Coord): number {
        return this.stackstate[stack.v][stack.w].length;
    }

    public transact(from: StackState_Coord, to: StackState_Coord) {
        this.transact_raw(from.v, from.w, to.v, to.w);
        this.automation();
    }

    private transact_raw(from_v: string, from_w: string, to_v: string, to_w: string) {
        // syntax check
        if (!(from_v in this.stackstate)) throw `Bad transfer syntax: transferring from v "${from_v}" cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        if (!(to_v in this.stackstate)) throw `Bad transfer syntax: transferring to v "${to_v}" cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        if (!(from_w in this.stackstate[from_v])) throw `Bad transfer syntax: transferring from w "${from_w}" (within "${from_v}") cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        if (!(to_w in this.stackstate[to_v])) throw `Bad transfer syntax: transferring to w "${to_w}" (within "${to_v}") cannot occur!\n(from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;

        // This can be expanded later to allow the UI to hook into these events.
        const intermediary = this.stackstate[from_v][from_w].pop();
        if (!intermediary) throw `No card in origin stack! (from: ${from_v}.${from_w}, to: ${to_v}.${to_w})`;
        this.stackstate[to_v][to_w].push(intermediary);
        this.onMut();
    }

    private automation() {
        // All aces are moved to ace stack.
        ["ones", "twos", "threes", "random"].forEach(row => {
            ["0", "1", "2", "3", "4", "5", "6", "7"].forEach(col => {
                while (this.stackstate[row][col].at(-1)?.value == 1) {
                    this.transact_raw(row, col, "special", "aces");
                }
            })
        });

        // Empty stacks on "random" row will be refilled from deck.
        ["0", "1", "2", "3", "4", "5", "6", "7"].forEach(col => {
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
        ["0", "1", "2", "3", "4", "5", "6", "7"].some(col => {
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

    public get_deck_count(): number {
        return this.stackstate["special"]["deck"].length;
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

    /// Collect current grab logic for stack (if the player is allowed to pick up the card here).
    public get_grab_logic(coord: StackState_Coord): boolean {
        this.coord_validate(coord);

        const peek = this.peek(coord);
        const peek_len = this.peek_len(coord);
        switch (coord.v) {
            case "ones":
                return (peek && !(peek.value == (peek_len * 3)+1)) ?? false;
            case "twos":
                return (peek && !(peek.value == (peek_len * 3)-1)) ?? false;
            case "threes":
                return (peek && !(peek.value == (peek_len * 3))) ?? false;
            case "random":
                return true;
            default:
                return false;
        }
    }

    /// Collect current drop logic for stack (if the player is allowed to drop "grab" here).
    public get_drop_logic(coord: StackState_Coord, grab?: Card): boolean {
        if (!grab) return false;

        this.coord_validate(coord);

        const peek = this.peek(coord);
        const cangrab = this.get_grab_logic(coord);
        const mod = grab.value % 3;
        const greater = peek && (~~(grab.value / 3) == (~~(peek.value / 3) + 1));
        switch (coord.v) {
            case "ones":
                return (greater == undefined) 
                    ? (grab.value == 4) 
                    : (!cangrab && mod == 1 && greater && grab.suit == peek.suit);
            case "twos":
                return (greater == undefined) 
                    ? (grab.value == 2) 
                    : (!cangrab && mod == 2 && greater && grab.suit == peek.suit);
            case "threes":
                return (greater == undefined) 
                    ? (grab.value == 3) 
                    : (!cangrab && mod == 0 && greater && grab.suit == peek.suit);
            case "random":
                // empty random cells can be dropped into
                return peek == undefined;
            default:
                return false;
        }
    }

    public to_string() : string {
        let o = "game:\n";
        ["twos", "threes", "ones", "random"].forEach(row => {
            ["0", "1", "2", "3", "4", "5", "6", "7"].forEach(col => {
                if (this.stackstate[row][col].length > 0) {
                    this.stackstate[row][col].forEach(card=>{
                        o+=card.to_chars()+"&";
                    });
                    o=o.substring(0,o.length-1);
                    o+=" ";
                }
                else o += "[] ";
            });
            o += "\n";
        }); 
        o += "aces: ";
        if (this.stackstate["special"]["aces"].length > 0) {
            this.stackstate["special"]["aces"].forEach(card=>{
                o+=card.to_chars()+"&";
            });
            o=o.substring(0,o.length-1);
            o+=" ";
        }
        else o += "[] ";
        return o;
    }
}
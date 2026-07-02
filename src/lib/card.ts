/* 
Type definitions of a single card.
*/

export default class Card {
    public readonly suit : Suit;
    public readonly value : Value;

    constructor(suit : Suit, value : Value) {
        this.suit = suit;
        this.value = value;
    }

    suit_to_text() : string {
        switch (this.suit) {
            case Suit.Spade: return "Spade";
            case Suit.Heart: return "Heart";
            case Suit.Diamond: return "Diamond";
            case Suit.Club: return "Club";
        }
    }

    value_to_text() : string {
        switch (this.value) {
            case 1: return "Ace";
            case 2: return "Two";
            case 3: return "Three";
            case 4: return "Four";
            case 5: return "Five";
            case 6: return "Six";
            case 7: return "Seven";
            case 8: return "Eight";
            case 9: return "Nine";
            case 10: return "Ten";
            case 11: return "Jack";
            case 12: return "Queen";
            case 13: return "King";
        }
    }

    public to_text() : string {
        return `${this.value_to_text()} of ${this.suit_to_text()}s`
    }
}

export enum Suit {
    Spade,
    Heart,
    Diamond,
    Club
}

export type Value = 1|2|3|4|5|6|7|8|9|10|11|12|13;
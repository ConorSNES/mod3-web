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

    public static from_object(v : object) : Card {
        if (!Object.hasOwn(v, "suit")) throw "Cannot convert object to Card: suit is not present";
        if (!Object.hasOwn(v, "value")) throw "Cannot convert object to Card: value is not present";
        const v2 = v as { suit : unknown, value : unknown }
        if (!(typeof v2.suit === "number" && v2.suit in Suit)) throw `Cannot convert object to Card: suit is bad type (${v2.suit})`;
        if (!(typeof v2.value === "number" && [1,2,3,4,5,6,7,8,9,10,11,12,13].includes(v2.value))) throw `Cannot convert object to Card: value is bad type (${v2.value})`;
        return new Card(v2.suit, v2.value as Value);
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

    public to_chars() : string {
        const s = ((suit : Suit)=>{
            switch (suit) {
                case Suit.Spade: return '♠';
                case Suit.Heart: return '♡';
                case Suit.Diamond: return '♢';
                case Suit.Club: return '♣';
            }
        })(this.suit);
        const v = ((value : number)=>{
            switch (value) {
                case 1: return '1';
                case 10: return '0';
                case 11: return 'j';
                case 12: return 'k';
                case 13: return 'q';
                default: return value.toString();
            }
        })(this.value);
        return `${s}${v}`;
    }
}

export enum Suit {
    Spade,
    Heart,
    Diamond,
    Club
}

export type Value = 1|2|3|4|5|6|7|8|9|10|11|12|13;
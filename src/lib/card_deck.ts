/* 
Convenience function returning a full 52 card deck.
*/

import Card, { Suit, type Value } from "./card"

export default function card_deck() : Card[] {
    const suits = [Suit.Club, Suit.Diamond, Suit.Heart, Suit.Spade];
    const values = [1,2,3,4,5,6,7,8,9,10,11,12,13] as Value[];
    return suits.map(
        (suit) => values.map( (value) => new Card(suit, value) )
    ).flat()
}
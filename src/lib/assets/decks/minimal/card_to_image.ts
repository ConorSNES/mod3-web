/* 
Function converting a card to its associated image resource.
*/

import position from "./position.png";
import stack from "./stack.png";
import back from "./back.png";

export { position, stack, back };


import null_card from "./null.png";

// nightmare import time..
import dm_a from "./dm.a.png";
import dm_2 from "./dm.2.png";
import dm_3 from "./dm.3.png";
import dm_4 from "./dm.4.png";
import dm_5 from "./dm.5.png";
import dm_6 from "./dm.6.png";
import dm_7 from "./dm.7.png";
import dm_8 from "./dm.8.png";
import dm_9 from "./dm.9.png";
import dm_10 from "./dm.10.png";
import dm_j from "./dm.j.png";
import dm_q from "./dm.q.png";
import dm_k from "./dm.k.png";
import cl_a from "./cl.a.png";
import cl_2 from "./cl.2.png";
import cl_3 from "./cl.3.png";
import cl_4 from "./cl.4.png";
import cl_5 from "./cl.5.png";
import cl_6 from "./cl.6.png";
import cl_7 from "./cl.7.png";
import cl_8 from "./cl.8.png";
import cl_9 from "./cl.9.png";
import cl_10 from "./cl.10.png";
import cl_j from "./cl.j.png";
import cl_q from "./cl.q.png";
import cl_k from "./cl.k.png";
import he_a from "./he.a.png";
import he_2 from "./he.2.png";
import he_3 from "./he.3.png";
import he_4 from "./he.4.png";
import he_5 from "./he.5.png";
import he_6 from "./he.6.png";
import he_7 from "./he.7.png";
import he_8 from "./he.8.png";
import he_9 from "./he.9.png";
import he_10 from "./he.10.png";
import he_j from "./he.j.png";
import he_q from "./he.q.png";
import he_k from "./he.k.png";
import sp_a from "./sp.a.png";
import sp_2 from "./sp.2.png";
import sp_3 from "./sp.3.png";
import sp_4 from "./sp.4.png";
import sp_5 from "./sp.5.png";
import sp_6 from "./sp.6.png";
import sp_7 from "./sp.7.png";
import sp_8 from "./sp.8.png";
import sp_9 from "./sp.9.png";
import sp_10 from "./sp.10.png";
import sp_j from "./sp.j.png";
import sp_q from "./sp.q.png";
import sp_k from "./sp.k.png";
// yep that was going to suck

import { Suit } from "../../../card";
import type Card from "../../../card";

export function card_to_image(card: Card): string {
    // In practice, this is a MASSIVE translation table to avoid bad headaches later
    switch (card.suit) {
        case Suit.Spade: switch (card.value) {
            case 1: return sp_a;
            case 2: return sp_2;
            case 3: return sp_3;
            case 4: return sp_4;
            case 5: return sp_5;
            case 6: return sp_6;
            case 7: return sp_7;
            case 8: return sp_8;
            case 9: return sp_9;
            case 10: return sp_10;
            case 11: return sp_j;
            case 12: return sp_q;
            case 13: return sp_k;
            default: return null_card;
        }
        case Suit.Heart: switch (card.value) {
            case 1: return he_a;
            case 2: return he_2;
            case 3: return he_3;
            case 4: return he_4;
            case 5: return he_5;
            case 6: return he_6;
            case 7: return he_7;
            case 8: return he_8;
            case 9: return he_9;
            case 10: return he_10;
            case 11: return he_j;
            case 12: return he_q;
            case 13: return he_k;
            default: return null_card;
        }
        case Suit.Diamond: switch (card.value) {
            case 1: return dm_a;
            case 2: return dm_2;
            case 3: return dm_3;
            case 4: return dm_4;
            case 5: return dm_5;
            case 6: return dm_6;
            case 7: return dm_7;
            case 8: return dm_8;
            case 9: return dm_9;
            case 10: return dm_10;
            case 11: return dm_j;
            case 12: return dm_q;
            case 13: return dm_k;
            default: return null_card;
        }
        case Suit.Club: switch (card.value) {
            case 1: return cl_a;
            case 2: return cl_2;
            case 3: return cl_3;
            case 4: return cl_4;
            case 5: return cl_5;
            case 6: return cl_6;
            case 7: return cl_7;
            case 8: return cl_8;
            case 9: return cl_9;
            case 10: return cl_10;
            case 11: return cl_j;
            case 12: return cl_q;
            case 13: return cl_k;
            default: return null_card;
        }
        default: return null_card;
    }
}
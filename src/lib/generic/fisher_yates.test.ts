import fisher_yates from "./fisher_yates";
import { describe, expect, test } from 'vitest';

describe("fisher_yates", ()=>{
    test("does not affect input array", ()=>{
        const set = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
        fisher_yates(set, 0);
        expect(set).toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7 ]);
    });

    test("preserve count of mutated array elements", ()=>{
        const set = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
        const shuffle = fisher_yates(set, 0);
        [ 0, 1, 2, 3, 4, 5, 6, 7 ].forEach(set_element => {
            expect(shuffle.filter(shuffle_element => shuffle_element == set_element).length).toBe(1);
        });
    });
})


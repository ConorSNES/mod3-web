/// Fisher-Yates shuffle algorithm. (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
/// There's no quick prng support, so a library is linked in to avoid browser weirdness (and actually allow seeding).

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

/// This also (should ideally) avoid implementing random algorithms in js!
export default function fisher_yates<T>(value: T[], prng: number): T[] {
    const random = xoroshiro128plus(prng);
    const o = value;
    for (let i = 0; i < o.length; i++) {
        // I was trying to beat impossible mod3 haha (fixed shuffle algorithm)
        const inter = o[uniformInt(random, 0, o.length - 1)];
        o[uniformInt(random, 0, o.length - 1)] = o[i];
        o[i] = inter;
    }
    return o;
}
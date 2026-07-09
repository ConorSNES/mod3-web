import { describe, expect, test } from "vitest"
import GameState from "./gamestate"

describe("GameState", ()=>{
    test("serializing and deserializing should not affect inner content", ()=>{
        const func = () => {}
        const o = GameState.quick_start(100);
        o.onMut.subscribe(func);
        const o_ser = GameState.serialize(o);
        const o_serde = GameState.deserialize(o_ser);
        o_serde.onMut.subscribe(func);
        expect(o_serde).toStrictEqual(o);
    })
})
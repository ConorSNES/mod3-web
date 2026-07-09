import { describe, expect, test } from "vitest";
import DelayLoop from "./delay_loop";
import delay from "./delay";

describe("DelayLoop", async () => {
    test("breaking DelayLoop causes it to execute only once", async () => {
        expect.hasAssertions();

        let counter = 0;
        const loop = new DelayLoop(10, () => {
            counter++;
        });
        loop.start();
        loop.break();

        await delay(100, (r) => r(undefined)).then( () =>
            expect(counter).toEqual(1)
        );
    }, 200);

    test("executes multiple times", async () => {
        expect.hasAssertions();

        let counter = 0;
        const loop = new DelayLoop(10, () => {
            counter++;
        });
        loop.start();
        loop.break();

        await delay(100, (r) => r(undefined)).then( () =>
            expect(counter).toEqual(1)
        );
    }, 200);
});
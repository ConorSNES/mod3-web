<script lang="ts">
    import MetaCard, { Suit } from "$lib/card";
    import Frame from "$lib/component/generic/frame.svelte";
    import ManagedStack from "$lib/component/managed_stack.svelte";

    let stackrepo : {[key: string]: MetaCard[]} = $state({
        "top1" : [
            new MetaCard(Suit.Diamond, 7),
            new MetaCard(Suit.Club, 7),
            new MetaCard(Suit.Heart, 7),
        ],
        "top2" : [new MetaCard(Suit.Club, 2),],
        "top3" : [new MetaCard(Suit.Spade, 7),],
        "top4" : [],
        "top5" : [],
        "top6" : [],
    });
    let stackrepo_iterator = $derived(Object.keys(stackrepo));

    let moving: null | { v : MetaCard, i : string } = $state(null);
    let allowdrop = $derived(moving != null);

    function grab(v: MetaCard, i : string) {
        moving = {v, i};
    }

    function release(v: MetaCard, i : string) {
        if (moving?.v == v && moving?.i == i) {
            moving = null;
        }
    }

    function drop(i: string) {
        console.log("drop triggered")
        if (!moving) return;

        // find source
        let source = stackrepo[moving.i];
        if (!source) return;
        // find recipient
        let recipient = stackrepo[i];
        if (!recipient) return;
        // remove from source
        if (source.pop() != moving.v) return;
        // add to recipient
        recipient.push(moving.v);
        // delete transfer value
        moving = null;
    }

    function droplogic(stackid : string) : boolean {
        // if we are not in drop phase do not allow dropping cards
        if (!allowdrop || !moving) return false;

        if (moving.i == stackid) return false; // disallow dropping onto the same stack


        let peek = stackrepo[stackid].at(-1);
        if (!peek) return true; // allow dropping on empty stacks
        return (peek.value == moving.v.value); // disallow dropping on stacks without the same value
    }
</script>

<Frame>
    <a href="..">back</a>
</Frame>

<div class="stacker">
    {#each stackrepo_iterator as key (key)}
        <ManagedStack 
            stack={stackrepo[key]}
            ident={key}
            allowdrop={droplogic(key)}
            ondrop={drop}
            ongrab={grab}
            onrelease={release}
        />
    {/each}
</div>

<style>
    .stacker {
        display: flex;
        flex-direction: row;

        gap: 16px;
        padding: 32px;

        border: 2px dashed green;
    }
</style>

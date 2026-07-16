<script lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */

    import type MetaCard from "../card";
    import Card from "../component/card.svelte";
    import CardStack from "./card_stack.svelte";

    let {
        stack = [],
        ident = null,
        allowgrab = true,
        allowdrop = false,
        ongrab = () => {},
        onquickmove = () => {},
        onrelease = () => {},
        ondrop = () => {},
    }: {
        stack?: readonly MetaCard[]; // managed stack of cards to vis on this CardStack
        ident?: any; // identifier for this stack
        allowgrab?: boolean; // allow grabbing
        allowdrop?: boolean; // allow mouse release events
        ongrab?: (v: MetaCard, i: any) => void; // Card ongrab event
        onquickmove?: (v: MetaCard, i: any) => void;
        onrelease?: (v: MetaCard, i: any) => void; // Card onrelease event
        ondrop?: (i: any) => void;
    } = $props();

    function managed_ongrab(v: MetaCard) {
        ongrab(v, ident);
    }

    function managed_onquickmove(v: MetaCard) {
        onquickmove(v, ident);
    }

    function managed_onrelease(v: MetaCard) {
        onrelease(v, ident);
    }

    function managed_ondrop() {
        ondrop(ident);
    }
</script>

<CardStack {allowdrop} ondrop={managed_ondrop}>
    {#each stack as card, idx (idx)}
        <Card
            {card}
            allowgrab={allowgrab && idx + 1 == stack.length}
            ongrab={managed_ongrab}
            onrelease={managed_onrelease}
            onquickmove={managed_onquickmove}
        />
    {/each}
</CardStack>

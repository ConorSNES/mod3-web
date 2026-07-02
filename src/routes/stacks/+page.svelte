<script>
    import Card from "$lib/component/card.svelte";
    import CardStack from "$lib/component/card_stack.svelte";
    import MetaCard, { Suit } from "$lib/card";
    import Frame from "$lib/component/generic/frame.svelte";

    let stack1 = [
        new MetaCard(Suit.Club, 2),
        new MetaCard(Suit.Diamond, 7),
    ]

</script>

<Frame>
    <a href="..">back</a>
</Frame>


<div class="stacker">
    <CardStack>
        {#each stack1 as v (v)}
            <Card card={v}/>
        {/each}
    </CardStack>

    <CardStack/>
</div>

<style>
    .stacker {
        display: flex;
        flex-direction: row;

        gap: 16px;
    }
</style>
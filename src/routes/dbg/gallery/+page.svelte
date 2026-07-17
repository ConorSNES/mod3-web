<script>
    import Card from "$lib/component/card.svelte";
    import card_deck from "$lib/card_deck";
    import Frame from "$lib/component/generic/frame.svelte";

    const doubledeck = card_deck().concat(card_deck());
</script>

<Frame>
    <a href="..">back</a>
</Frame>

<div class="gallery">
    {#each doubledeck as card, idx (idx)}
        <Card card={card}/>
    {/each}
</div>

<style>
    .gallery {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4px;
        padding: 8px;
        margin: 16px;
    }
</style>
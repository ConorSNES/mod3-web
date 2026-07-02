<script>
    import Card from "$lib/component/card.svelte";
    import card_deck from "$lib/card_deck";
</script>

<a href="..">back</a>

<div class="gallery">
    {#each card_deck() as card (card)}
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
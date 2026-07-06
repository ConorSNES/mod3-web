<script lang="ts">
    import GameState from "$lib/gamestate";
    import ManagedStack from "./managed_stack.svelte";
    import deckstack from "$lib/assets/cards_2_deckstack.png";

    let { gamestate = $bindable(GameState.quick_start()) } : { gamestate? : GameState } = $props();

    const gamestate_view = $derived(gamestate.get_view());
    const aces_view = $derived(gamestate.get_aces());
</script>

<div class="gamestate">
    {#each ["twos", "threes", "ones", "random"] as row (row)}
        {#each ["0", "1", "2", "3", "4", "5", "6", "7"] as col (row+col)} 
            {@const stack = gamestate_view[row][col]}
            <div class={`${row} ${col}`}>
                <ManagedStack stack={stack} ident={{v : row, w : col}} />
            </div>
        {/each}
    {/each}
    <div class="aces">
        <ManagedStack stack={aces_view} allowgrab={false}/>
    </div>
    <button class="deck" title="Draw new cards from deck">
        <img src={deckstack} alt="deck"/>
    </button>
</div>

<style>
    .gamestate {
        padding: 8px;
        gap: 8px;

        display: grid;
        column-count: 9;

        place-content: center;

        .ones {
            grid-row: 1;
        }

        .twos {
            grid-row: 2;
        }

        .threes {
            grid-row: 3;
        }

        .random {
            grid-row: 4;
        }

        .aces {
            grid-column: 9;
            grid-row-start: 1;
            grid-row-end: 3;

            padding-left: 16px;
        }

        .deck {
            grid-column: 9;
            grid-row: 4;

            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
            padding-left: 16px;
            height:fit-content;
            width:fit-content;
        }
    }
</style>
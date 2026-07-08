<script lang="ts">
    import GameState, { type StackState_Coord } from "$lib/gamestate";
    import ManagedStack from "./managed_stack.svelte";
    import CardData from "$lib/card";
    import deckstack from "$lib/assets/cards_2_deckstack.png";
    import position from "$lib/assets/deck/position.png";
    import { height, width } from "$lib/cardscale";

    let {
        gamestate = $bindable(GameState.quick_start())
    }: { gamestate?: GameState } = $props();

    let gamehash = $state(0);
    function rehash() {
        gamehash += 1;
    }

    $effect(() => {
        gamestate.onMut = () => {
            rehash();
        };
    });

    //const gamestate_view = $derived(gamestate.get_view());
    const aces_view = $derived(gamestate.get_aces());
    //const deck_count = $derived(gamestate.get_deck_count());

    // manage held cards
    let held: {
        origin: StackState_Coord;
        card: CardData;
    } | null = $state(null);

    // card is grabbed from stack
    function grab(card: CardData, origin: StackState_Coord) {
        held = {
            origin: origin,
            card: card,
        };
    }

    // card recieves drop signal from meta
    function release(card: CardData, origin: StackState_Coord) {
        // nullify held data if the logic lines up
        if (
            held?.card == card &&
            held?.origin.v == origin.v &&
            held?.origin.w == origin.w
        )
            held = null;
    }

    // stack intercepts drop signal
    function drop(origin: StackState_Coord) {
        if (!held) return;

        gamestate.transact(held.origin, origin);
        // attempt to force rerender for state change
        gamestate = gamestate;
        held = null;
    }

    // deal cards to "random"
    function deal() {
        gamestate.deal_once();
    }
</script>

<div class="gamestate" style="--card-height: {height}px; --card-width: {width}px;">
    {#key gamehash}
        {@const gamestate_view = gamestate.get_view()}
        {@const deck_count = gamestate.get_deck_count()}


        {#each ["twos", "threes", "ones", "random"] as row (row)}
            {#each ["0", "1", "2", "3", "4", "5", "6", "7"] as col (gamestate_view[row][col])}
                {@const stack = gamestate_view[row][col]}
                {@const ident = { v: row, w: col } as StackState_Coord}
                <div class={`${row} ${col}`}>
                    <ManagedStack
                        {stack}
                        {ident}
                        allowgrab={gamestate.get_grab_logic(ident)}
                        allowdrop={gamestate.get_drop_logic(ident, held?.card)}
                        ongrab={grab}
                        onrelease={release}
                        ondrop={drop}
                    />
                </div>
            {/each}
        {/each}
        <div class="aces">
            <ManagedStack stack={aces_view} allowgrab={false} />
        </div>

        {#if deck_count > 0}
            <button
                class="deck"
                title="Draw new cards from deck"
                onclick={deal}
            >
                <img src={deckstack} alt="deck" width={width}/>
                <span class="sub">left</span>
                <span>{deck_count}</span>
            </button>
        {:else}
            <div class="deck_placeholder">
                <img src={position} alt="empty deck" width={width}/>
            </div>
        {/if}
    {/key}
</div>

<style>
    .gamestate {
        padding: 32px 48px;
        gap: 8px;

        display: grid;
        column-count: 9;

        place-content: center;

        width: fit-content;
        min-height: fit-content;


        .twos, .threes, .ones, .random {
            height: calc(var(--card-height) * 1.2);
        }

        .twos {
            grid-row: 1;
        }

        .threes {
            grid-row: 2;
        }

        .ones {
            grid-row: 3;
        }

        .random {
            grid-row: 4;
        }

        .aces {
            grid-column: 9;
            grid-row-start: 1;
            grid-row-end: 4;

            padding-left: 16px;
        }

        .deck_placeholder,
        .deck {
            grid-column: 9;
            grid-row: 4;

            padding: 0;
            padding-left: 16px;
        }

        .deck {
            display: grid;

            height: fit-content;
            width: fit-content;

            cursor: pointer;
            border: none;
            background: none;

            > * {
                grid-row: 1;
                grid-column: 1;
            }

            > span {
                display: flex;
                place-items: center;
                place-content: center;
                font-size: calc(var(--card-width) / 3.0);
                text-align: center;

                color: white;

                transition: opacity 500ms ease-out;
                opacity: 0;

                &.sub {
                    background: #00000086;

                    font-size: calc(var(--card-width) / 5.0);
                    padding-top: calc(var(--card-height) / 2.0);
                }
            }
            &:hover > span {
                transition: none; /* opacity 100ms ease-out; */
                opacity: 1;
            }
        }
    }
</style>

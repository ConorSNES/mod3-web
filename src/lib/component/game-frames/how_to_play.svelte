<script lang="ts">
    import Frame from "../generic/frame.svelte";
    import IconButton from "../generic/icon_button.svelte";
    import left from "../../assets/iconkit/left.svg";
    import right from "../../assets/iconkit/right.svg";
    import exit from "../../assets/iconkit/exit.svg";
    import tray from "../../assets/iconkit/tray.svg";

    let slide = $state(0);
    const slides = [slide1, slide2, slide3, slide4, slide5, hintstips];

    let { onMinimize = () => {} }: { onMinimize?: () => void } = $props();
</script>

{#snippet slide1()}
    <figure>
        <enhanced:img
            src="../../assets/howto_thumbs/basegame.png"
            alt="...initial game state"
        />
    </figure>
    <p>
        Mod3 solitaire is a singleplayer game played with two decks of cards.
        The main objective is to sort the cards into 24 piles under specific
        logic.
    </p>
    <p>
        At the start of the game, <b>all 32 cells are filled with one card</b> each.
    </p>
{/snippet}

{#snippet slide2()}
    <figure>
        <enhanced:img
            src="../../assets/howto_thumbs/acesmove.png"
            alt="...aces move instantly"
        />
    </figure>
    <p>
        Aces are always <b>moved to the Ace pile instantly</b>.
    </p>
{/snippet}

{#snippet slide3()}
    <figure>
        <enhanced:img
            src="../../assets/howto_thumbs/replenishingstacks.png"
            alt="...bottom stack slots are replenished by deck"
        />
    </figure>
    <p>
        Any <b>empty cells</b> on the <b>bottom row</b> are
        <b>refilled with one card from the deck instantly</b>, if possible.
    </p>
    <p>Otherwise, they can be used as free cells.</p>
{/snippet}

{#snippet slide4()}
    <figure>
        <enhanced:img
            src="../../assets/howto_thumbs/stackorder.png"
            alt="...stack ordering"
        />
    </figure>
    <p>
        Each row (besides the bottom row) has a specific ascending order in
        which you stack the cards.
    </p>
    <p>
        <b
            >The first row is stacked 2-5-8-J, the second row 3-6-9-Q, the third
            4-7-10-K.</b
        >
    </p>
    <p>
        <b>Stacks may only be made with cards of the same suit</b> and
        <b>cards in a valid position cannot be moved</b>.
    </p>
{/snippet}

{#snippet slide5()}
    <figure>
        <enhanced:img
            src="../../assets/howto_thumbs/deckdeal.png"
            alt="...bottom row"
        />
    </figure>
    <p>
        Clicking the deck while it has cards will deal one to every stack on the
        bottom row, from left to right.
    </p>
    <p>
        You can move surface-level cards from the bottom row, as well as any not
        already in a valid position on the three sorted rows.
    </p>
{/snippet}

{#snippet hintstips()}
    <h1 class="hintstips">Hints and tips:</h1>
    <p>
        The game should save automatically to your browser, however clearing
        cache or switching devices may cause you to lose your preferences.
    </p>
    <p>
        You can remove elements such as the timer and move counter in the
        settings menu, as well as the size of the cards.
    </p>
    <p>
        If it is hard to make out the different card suits, try the setting
        labeled "Card Style" in the settings menu. The "Coloured suits" option
        should provide the best contrast, but may look stange when dark theme is
        enabled.
    </p>
    <p>
        For keyboard/mouse users: Shift-clicking a card will "quick-move" it.
        Shift-clicking the maximise button will full screen the game.
    </p>
{/snippet}

<Frame pad={false} style="min-height:80%; width:80%;">
    <header>
        <span class="headerfill">How to Play</span>
        <IconButton
            src={tray}
            alt="minimise config menu"
            onclick={onMinimize}
        />
    </header>
    <article id="howto">
        {#each slides as render, key (key)}
            {#if key == slide}
                {@render render()}
            {/if}
        {/each}
    </article>
    <footer>
        {#if slide > 0}
            <IconButton
                src={left}
                alt="Previous"
                title="Go to previous slide"
                onclick={() => slide--}
            />
        {:else}
            <IconButton
                src={exit}
                alt="Exit"
                title="Exit"
                onclick={onMinimize}
            />
        {/if}

        {#each slides.keys() as key (key)}
            <button
                class="indicator {key <= slide ? 'filled' : ''}"
                disabled={key == slide}
                onclick={() => {
                    slide = key;
                }}>{key}</button
            >
        {/each}

        {#if slide < slides.length - 1}
            <IconButton
                src={right}
                alt="Next"
                title="Go to next slide"
                onclick={() => slide++}
            />
        {:else}
            <IconButton
                src={exit}
                alt="Exit"
                title="Exit"
                onclick={onMinimize}
            />
        {/if}
    </footer>
</Frame>

<style>
    article#howto {
        display: flex;
        flex-direction: column;

        gap: 16px;

        padding: 16px;
        min-width: 50vw;
        height: 100%;
        box-sizing: border-box;

        overflow-y: auto;
        overflow-x: hidden;

        * {
            font-weight: 400;
            margin: 0;
        }

        b {
            font-weight: 900;
        }

        figure {
            min-width: fit-content;
            width: 100%;
            height: 50vh;
            box-sizing: border-box;
            overflow: hidden;

            display: flex;
            place-items: center;
            place-content: center;
            flex-shrink: 0;

            border: 2px solid black;

            * {
                box-sizing: border-box;
                display: block;
            }

            :global(img) {
                height: 50vh;
                width: auto;
            }
        }

        .hintstips {
            font-size: 24px;
            font-weight: 900;
            color: white;
            width: 100%;
            padding: 4px;
            text-align: center;
            background-color: black;
            box-sizing: border-box;
        }
    }

    footer {
        display: flex;
        flex-direction: row;
        width: 100%;
        place-items: end;
        place-content: space-between;
        gap: 4px;

        :global(> :first-child) {
            border-top: 2px solid black;
            border-right: 2px solid black;
        }

        :global(> :last-child) {
            border-top: 2px solid black;
            border-left: 2px solid black;
        }

        .indicator {
            border: 1px solid black;
            margin-bottom: 2px;
            height: 6px;
            width: 100%;
            font-size: 0;
            overflow: hidden;
            cursor: pointer;

            transition: all 150ms ease-out;

            &.filled {
                background-color: black;
            }

            &[disabled] {
                background-color: #4e4e4e;
                cursor: default;
                height: 4px;
            }
        }
    }

    header {
        display: flex;
        flex-direction: row;
        align-items: center;

        border-bottom: 2px solid black;
        height: fit-content;

        :global(> *) {
            border-left: 2px solid black;
            height: 100%;
        }

        > :first-child {
            border-left: none;
        }

        > span {
            display: block;
            white-space: nowrap;
            text-align: center;
            line-height: 32px;

            width: 100%;

            font-weight: 800;
        }
    }
</style>

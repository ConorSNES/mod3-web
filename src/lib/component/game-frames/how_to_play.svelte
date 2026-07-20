<script lang="ts">
    import Frame from "../generic/frame.svelte";
    import IconButton from "../generic/icon_button.svelte";
    import left from "../../assets/iconkit/left.svg";
    import right from "../../assets/iconkit/right.svg";
    import exit from "../../assets/iconkit/exit.svg";
    import tray from "../../assets/iconkit/tray.svg";

    let slide = $state(0);
    const slides = [slide1, slide2, slide3, slide4];

    let { onMinimize = () => {} }: { onMinimize?: () => void } = $props();
</script>

{#snippet slide1()}
    <figure>
        <enhanced:img src="../../assets/howto_thumbs/basegame.png" alt="initial game state" />
    </figure>
    <p>
        Mod3 solitaire is a singleplayer game played with two decks of cards. 
        The main objective is to sort the cards into 24 piles under specific logic.
    </p>
    <p>
        At the start of the game, <b>all 32 cells are filled with one card</b> each.
    </p>
{/snippet}

{#snippet slide2()}
    <p>
        Aces are always <b>moved to the Ace pile instantly</b>. 
    </p>
{/snippet}

{#snippet slide3()}
    <p>
        Any <b>empty cells</b> on the <b>bottom row</b> are <b>refilled with one card from the deck instantly</b>.
    </p>
    <p>
        If the deck is empty, you can use them for anything.
    </p>
{/snippet}

{#snippet slide4()}
    <caption>forgo</caption>
{/snippet}

<Frame pad={false}>
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
        padding: 16px;
        width: 50vw;

        * {
            font-weight: 400;
            margin: none;
        }

        b {
            font-weight: 900;
        }

        figure {
            width: 100%;
            height: 256px;
            overflow: hidden;

            >* {
                
            }
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

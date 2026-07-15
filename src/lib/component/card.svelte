<script lang="ts">
    import type Card from "../card";
    import card_to_image from "../card_to_image";
    import { CardScale } from "../cardscale";
    import delay from "../generic/delay";
    import { onDestroy, onMount } from "svelte";

    let height = $state(CardScale.height);
    let width = $state(CardScale.width);
    function update_cardscale() {
        height = CardScale.height;
        width = CardScale.width;
    }
    onMount(() => CardScale.onMut.subscribe(update_cardscale));
    onDestroy(() => CardScale.onMut.unsubscribe(update_cardscale));

    let {
        card,
        allowgrab = true,
        ongrab = () => {},
        onquickmove = () => {},
        onrelease = () => {},
    }: {
        card: Card;
        allowgrab?: boolean;
        ongrab?: (v: Card) => void;
        onquickmove?: (v: Card) => void;
        onrelease?: (v: Card) => void;
    } = $props();

    let image = $derived(card_to_image(card));

    let self: HTMLDivElement;

    let grabbed = $state(false);
    let grabmove = $state(false);

    function grab(event: MouseEvent | TouchEvent) {
        if (event.shiftKey) {
            onquickmove(card);
            return;
        }
        if (event instanceof TouchEvent) event.preventDefault();

        follow(event);
        grabbed = true;
        delay(10, () => grabmove = true);
        ongrab(card);
    }

    function release() {

        grabbed = false;
        grabmove = false

        if (!self) return;
        self.style.transform = "";
        onrelease(card);
    }

    // use function pointer switch to manage grability
    let dograb = $derived(allowgrab ? grab : undefined);
    let dorelease = $derived(grabbed ? release : undefined);
    let dofollow = $derived(grabbed ? follow : undefined);
    let grabclass = $derived(
        [
            allowgrab ? "cangrab" : "",
            grabbed ? "grabbed" : "",
            grabmove ? "grabmotion" : ""
        ].join(" ")
    );

    function follow(event: MouseEvent | TouchEvent) {
        const ev = event instanceof MouseEvent ? event : event.touches[0];
        self.style.transform = `translateY(${ev.clientY - height / 2.0}px) translateX(${ev.clientX - width / 2.0}px)`;
    }
</script>

<svelte:document 
    on:mouseup={dorelease}
    on:touchend={dorelease}
    on:touchcancel={dorelease}
    on:mousemove={dofollow}
    on:touchmove={dofollow}
/>

<svelte:body
    on:mouseleave={dorelease}
/>

<div
    bind:this={self}
    onmousedown={dograb}
    ontouchstart={dograb}
    role="none"
    class={grabclass}
>
    <img src={image} alt={card.to_text()} {height} {width} />
</div>

<style>
    div {
        display: flex;
        width: fit-content;
        height: fit-content;
        padding: 0;
        margin: 0;

        background: white;

        user-select: none;
        -webkit-user-select: none;

        text-align: center;

        > * {
            pointer-events: none;
        }

        /* this stylecode is only relevant when a card can be grabbed */
        &.cangrab {
            cursor: grab;
            /* box-shadow: 0px 0px 5px #00000065; */

            &:global(.grabbed) {
                cursor: grabbing;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 100;
                margin: 0;

                pointer-events: none;

                transition: box-shadow 200ms ease-out;
                box-shadow: 0px 6px 5px #00000065;
            }

            &:global(.grabmotion) {
                transition:
                    transform 100ms cubic-bezier(0.25, 1, 0.5, 1),
                    box-shadow 200ms ease-out;
            }
        }

        &:not(.cangrab) {
            cursor: not-allowed;
        }
    }
</style>

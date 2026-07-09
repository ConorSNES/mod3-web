<script lang="ts">
    import type Card from "$lib/card";
    import card_to_image from "$lib/card_to_image";
    import { height, width } from "$lib/cardscale";
    import delay from "$lib/generic/delay";

    let {
        card,
        allowgrab = true,
        ongrab = () => {},
        onrelease = () => {}
    }: { card: Card; allowgrab?: boolean; ongrab?: (v: Card) => void, onrelease?: (v: Card) => void } = $props();

    let image = $derived(card_to_image(card));

    let self: HTMLDivElement;

    function grab(event: MouseEvent) {
        if (event.shiftKey) return;

        follow(event);
        self.classList.add("grabbed");
        document.addEventListener("mouseup", release);
        document.addEventListener("mousemove", follow);
        document.body.addEventListener("mouseleave", release);
        delay(10, () => self.classList.add("grabmotion"));
        ongrab(card);
    }

    function release() {
        document.removeEventListener("mouseup", release);
        document.removeEventListener("mousemove", follow);
        document.body.removeEventListener("mouseleave", release);

        if (!self) return;
        self.style.transform = "";
        self.classList.remove("grabbed");
        
        self.classList.remove("grabmotion");
        onrelease(card);
    }

    // use function pointer switch to manage grability
    let dograb = $derived(allowgrab ? grab : () => {});
    let grabclass = $derived(allowgrab ? "cangrab" : "");

    function follow(event: MouseEvent) {
        self.style.transform = `translateY(${event.clientY - (height / 2.0)}px) translateX(${event.clientX - (width / 2.0)}px)`;
    }
</script>

<div bind:this={self} onmousedown={dograb} role="none" class={grabclass}>
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

            /* &:hover>img {
            } */
        }

        &:not(.cangrab) {
            cursor: not-allowed;
        }
    }
</style>

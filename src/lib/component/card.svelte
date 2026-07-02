<script lang="ts">
    import type Card from "$lib/card";
    import card_to_image from "$lib/card_to_image";
    import delay from "$lib/delay";

    let { card, cangrab = true } : { card : Card, cangrab?: boolean } = $props();

    let image = $derived(card_to_image(card));

    let self : HTMLDivElement;

    function grab(event : MouseEvent) {
        follow(event);
        self.classList.add("grabbed");
        document.addEventListener("mouseup", release);
        document.addEventListener("mousemove", follow);
        document.body.addEventListener("mouseleave", release);
        delay(10, () => self.classList.add("grabmotion"));
    }

    function release() {
        self.style.transform = "";
        self.classList.remove("grabbed");
        document.removeEventListener("mouseup", release);
        document.removeEventListener("mousemove", follow);
        document.body.removeEventListener("mouseleave", release);
        self.classList.remove("grabmotion")
    }

    // use function pointer switch to manage grability
    let dograb = $derived(cangrab ? grab : () => {});
    let grabclass = $derived(cangrab ? "cangrab" : "");

    function follow(event : MouseEvent) {
        self.style.transform = `translateY(${event.clientY-77}px) translateX(${event.clientX-52}px)`;
    }

    const height = 154;
    const width = 104;
</script>

<div bind:this={self} onmousedown={dograb} role="none" class={grabclass}>
    <img src={image} alt={card.to_text()} height={height} width={width}/>
</div>


<style>
    div {
        display: flex;
        width: fit-content;
        height: fit-content;
        padding: 0;
        margin: 0;

        user-select: none;
        -webkit-user-select: none;

        >* {
            pointer-events: none;
        }

        /* this stylecode is only relevant when a card can be grabbed */
        &.cangrab {
            cursor: grab;
            box-shadow: 0px 0px 5px #00000065;

            &:global(.grabbed) {
                cursor: grabbing;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 100;

                transition: box-shadow 200ms ease-out;
                box-shadow: 0px 6px 5px #00000065;
            }

            &:global(.grabmotion) {
                transition: transform 100ms ease-out, box-shadow 200ms ease-out;
            }
        }
    }
</style>
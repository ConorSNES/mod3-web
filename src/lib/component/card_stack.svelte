<script lang="ts">
    import { card_position } from "$lib/card_to_image";
    import { getUserConfig } from "$lib/userconfig";
    import { getDimensions } from "../cardscale";
    import { type Snippet } from "svelte";

    const config = getUserConfig();
    const [height, width] = $derived(getDimensions(config));
    const position = $derived(card_position(config));

    let {
        children,
        allowdrop = false,
        ondrop = () => {},
    }: {
        children?: Snippet;
        allowdrop?: boolean;
        ondrop?: () => void;
    } = $props();
</script>

<div class="stack" style:--width={`${width}px`} style:--height={`${height}px`} style:--position-url={`url(${position})`}>
    {@render children?.()}
    <div
        class="topbox {allowdrop ? '' : 'hide'}"
        onmouseup={allowdrop ? ondrop : () => {}}
        ontouchend={allowdrop ? ondrop : () => {}}
        ontouchcancel={allowdrop ? ondrop : () => {}}
        role="none"
    ></div>
</div>

<style>
    .stack {
        display: flex;
        flex-direction: column;
        width: var(--width);
        height: 100%;
        justify-content: space-between;
        align-items: start;

        background: var(--position-url);
        background-repeat: no-repeat;
        background-size: var(--width) var(--height);

        & > :global(*) {
            /* this doesn't work right with card dnd */
            /* transition: margin-top 200ms ease-out;  */

            margin-top: calc(var(--height) * -1);

            &:first-child {
                margin-top: 0;
            }

            /* peeking */
            &:hover:not(:nth-last-child(-n + 2)) > :global(img) {
                z-index: 10;
                opacity: 0.8;
            }
        }

        > .topbox {
            visibility: visible;
            box-sizing: border-box;

            border: 4px solid black;
            background: url("../assets/generic/dither.png");
            opacity: 0.2;

            width: var(--width);
            height: var(--height);

            transition: opacity 200ms ease-out;

            &:hover {
                opacity: 1;
            }

            &.hide {
                opacity: 0;

                user-select: none;
                -webkit-user-select: none;
                pointer-events: none;
            }
        }
    }
</style>

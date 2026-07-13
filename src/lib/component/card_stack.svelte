<script lang="ts">
    import { height, width } from "$lib/cardscale";
    import type { Snippet } from "svelte";

    let { children, allowdrop = false, ondrop = ()=>{} } : { children? : Snippet, allowdrop?: boolean, ondrop? : ()=>void } = $props();
</script>

<div class="stack" style="--width: {width}px; --height: {height}px;">
    {@render children?.()}
    <div class="topbox {allowdrop ? "" : "hide"}" onmouseup={allowdrop ? ondrop : ()=>{}} role="none"></div>
</div>

<style>
    .stack {
        display: flex;
        flex-direction: column;
        width: var(--width);
        height: 100%;
        justify-content: space-between;
        align-items: start;

        background: url("$lib/assets/deck/position.png");
        background-repeat: no-repeat;
        background-size: var(--width) var(--height);

        &>:global(*) {
            /* this doesn't work right with card dnd */
            /* transition: margin-top 200ms ease-out;  */

            margin-top: calc(var(--height) * -1);
            
            &:first-child {
                margin-top: 0;
            }

            /* peeking */
            &:hover:not(:nth-last-child(-n + 2)) {
                z-index: 10;
                opacity: 0.8;

                user-select: none;
                -webkit-user-select: none;
                pointer-events: none;
            }
        }

        >.topbox {
            visibility: visible;
            box-sizing: border-box;

            border: 4px solid black;
            background: url("$lib/assets/generic/dither.png");
            opacity: 0.2;

            width: var(--width);
            height: var(--height);

            transition: opacity 200ms ease-out;

            &:hover {
                opacity: 1.0;
            }

            &.hide {
                opacity: 0;

                user-select: none;
                -webkit-user-select: none;
                pointer-events: none;
            }
        }

        /* Peeking function. unused */
        /* &.peek>:global(:hover&:not(img, .topbox)) {
            margin-bottom: 40px;
        } */
    }
</style>
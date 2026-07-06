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
        }

        >.topbox {
            visibility: visible;
            box-sizing: border-box;

            border: 4px solid black;
            background: url("$lib/assets/dither.png");
            opacity: 0.2;

            width: var(--width);
            height: var(--height);

            transition: opacity 200ms;

            &:hover {
                opacity: 1.0;
            }

            &.hide {
                visibility: hidden;
            }
        }

        /* Peeking function. unused */
        /* &.peek>:global(:hover&:not(img, .topbox)) {
            margin-bottom: 40px;
        } */
    }
</style>
<script lang="ts">
    import type { Snippet } from "svelte";
    import position from "$lib/assets/deck/position.png";

    let { children, allowdrop = false, ondrop = ()=>{} } : { children? : Snippet, allowdrop?: boolean, ondrop? : ()=>void } = $props();

    const height = 154;
    const width = 104;
    var card_dist = $state(30);
    const card_spacing = $derived(-height+card_dist);
</script>

<div class="stack" style="--card-spacing: {card_spacing}px; --width: {width}px; --height: {height}px">
    <img src={position} alt="card stack"/>
    {@render children?.()}
    <div class="topbox {allowdrop ? "" : "hide"}" onmouseup={allowdrop ? ondrop : ()=>{}} role="none"></div>
</div>

<style>
    .stack {
        display: flex;
        flex-direction: column;
        width: var(--width);

        &>:global(*) {
            /* this doesn't work right with card dnd */
            /* transition: margin-top 200ms ease-out;  */

            margin-top: var(--card-spacing);

            &:first-child {
                box-sizing: border-box;
                margin-top: 0;
                margin-bottom: calc((var(--card-spacing) + var(--height)) * -1);
            }
        }

        >img {
            /* try to override user select to stop this sprite from messing up browsers */
            user-select: none;
            -webkit-user-select: none;
            pointer-events: none;
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
    }
</style>
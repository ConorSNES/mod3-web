<script lang="ts">
    import type { Snippet } from "svelte";

    let { children } : { children? : Snippet } = $props();

    const height = 154;
    const width = 104;
</script>

<div class="stack">
    <div class="dummy"></div>
    {@render children?.()}
    <div class="topbox" style="--width: {width}px; --height: {height}px"></div>
</div>

<style>
    .stack {
        --card-spacing: -124px;

        display: flex;
        flex-direction: column;

        overflow: hidden;

        &>:global(*) {
            margin-top: var(--card-spacing);
            &:first-child {
                box-sizing: border-box;
                margin-top: 0;
                height: calc(var(--card-spacing) * -1);
            }
        }

        .topbox {
            content: "";
            box-sizing: border-box;

            border: 1px solid red;

            width: var(--width);
            height: var(--height);
        }
    }
</style>
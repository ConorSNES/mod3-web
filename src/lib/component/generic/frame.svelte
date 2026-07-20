<script>
    let { children = undefined, pad = true, style=undefined } = $props();
</script>

<div class="frame" style:padding={pad ? "8px" : "0"} style={style}>
    {@render children?.()}
</div>

<style>
    .frame {
        border: 2px solid black;
        background: white;

        display: flex;
        flex-direction: column;

        max-height: 100%;
        max-width: 100%;

        height: fit-content;
        width: fit-content;

        overflow: hidden;
    }
</style>

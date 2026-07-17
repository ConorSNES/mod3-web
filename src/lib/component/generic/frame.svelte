<script>
    let { children = undefined, pad = true } = $props();
</script>

<div class="frame" style:padding={pad ? "8px" : "0"}>
    {@render children?.()}
</div>

<style>
    .frame {
        border: 2px solid black;
        background: white;
    }
</style>

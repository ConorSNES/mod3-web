<script>
    let { children = undefined } = $props();
</script>

<div class="frame">
    {@render children?.()}
</div>

<style>
    .frame {
        border: 2px solid black;
        background: white;
        padding: 8px;
    }
</style>
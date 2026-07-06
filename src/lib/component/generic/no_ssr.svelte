<!-- 

-->
<script>
    // Recipe kindly collected from the depths of a sveltejs issue on GitHub. 
    // Thank you, paoloricciuti.
    // src: https://github.com/sveltejs/kit/issues/2468
    let { children } = $props();
</script>

{#await Promise.resolve() then }
    {@render children()}
{/await}
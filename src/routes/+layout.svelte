<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	@keyframes background-scrolling {
        from {
            background-position-y: 0px;
            background-position-x: 0px;
        }

        to {
            background-position-y: 200px;
            background-position-x: 200px;
        }
    }

    main {
        display: flex;
        flex-direction: column;
		gap: 8px;
        padding: 8px;

		box-sizing: border-box;
		min-height: 100%;
		width: 100%;
        
        background-image: url("$lib/assets/generic/check.png");
        background-repeat: repeat;

        animation: background-scrolling 10s infinite linear;
    }

	:global(html, body) {
		display: flex;
		padding: 0;
		margin: 0;

		min-height: 100%;
		width: 100%;

		/* box-sizing: border-box; */
	}
</style>

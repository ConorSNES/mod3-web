<script>
    import Frame from "$lib/component/generic/frame.svelte";
import Game from "$lib/game.svelte";
</script>

<Frame>
    <h1>things</h1>

    <p>This text should be normal (serif)!!</p>

    <ul>
        <li><a href="./gallery">gallery</a></li>
        <li><a href="./game_only">game only</a></li>
        <li><a href="./stacks">stacks</a></li>
    </ul>
</Frame>

<Game/>



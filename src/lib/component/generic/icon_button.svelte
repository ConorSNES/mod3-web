<script lang="ts">
    let { 
        onclick = () => {},
        width = 32,
        height = 32,
        src, alt
    } : { 
        onclick? : (m : MouseEvent) => void,
        width? : number,
        height? : number,
        src : string,
        alt : string
    } = $props();
</script>

<button onclick={onclick}>
    <img src={src} alt={alt} width={width} height={height} />
</button>

<style>
    button {
        display: flex;

        box-sizing: content-box;
        cursor: pointer;
        border: none;
        background: white;
        padding: 0;

        transition: all 150ms ease-out;

        width: min-content;
        height: min-content;

        >img {
            user-select: none;
            -webkit-user-select: none;
            pointer-events: none;
        }
    

        &:hover, &:focus {
            background: #e2e2e2;
            transition: none;
        }

        &:active {
            background: #bdbdbd;
            transition: none;
        }
    }
</style>
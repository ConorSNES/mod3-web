<script lang="ts">
    /* Given how popular these things are, I probably don't need to explain it. Blockier aesthetic. */

    import switch_on from "../../assets/switch/on_switch.svg";
    import switch_off from "../../assets/switch/off_switch.svg";

    let { value = $bindable(false), fill = false }: { value: boolean, fill?: boolean} = $props();
</script>

<button onclick={() => (value = !value)} class={fill ? "fill" : "fill"} role="switch" aria-checked={value}>
    {#if value}
        <img src={switch_on} alt="ON" height="24" />
    {:else}
        <img src={switch_off} alt="OFF" height="24" />
    {/if}
</button>

<style>
    button {
        display: flex;
        place-content: center;

        box-sizing: content-box;
        cursor: pointer;
        border: none;
        background: #0000;
        padding: 0;

        transition: all 150ms ease-out;

        height: 24px;

        &:hover,
        &:focus {
            background: #0002;
            transition: none;
        }

        &:active {
            background: #0006;
            transition: none;
        }

        &.fill {
            width: 100%;
        }
    }
</style>

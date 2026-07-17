<script lang="ts">
    /* Custom range styled element. */

    let { 
        value = $bindable(0),
        min, max, step,
        label = false
    }: { 
        value: number, 
        min? : number | undefined,
        max? : number | undefined,
        step? : number | undefined,
        label? : boolean
    } = $props();
</script>

<div>
    {#if label} 
    <input type="number" min={min} max={max} step={step} bind:value />
    {/if}
    <input type="range" bind:value min={min} max={max} step={step} />
</div>

<style>
    div {
        display: flex;
        flex-wrap: nowrap;
        place-items: center;

        padding: 0 4px;
        gap: 8px;

        min-height: 24px;

        transition: background 200ms ease-out;
        background: #0000;

        &:hover {
            background: #0002;
            transition: none;
        }

        >* {
            height: min-content;
            min-width: 3ch;
        }
    }

    /* 
    These styles were made with some assistance of a browser tool (https://range-input-css.netlify.app/) 
    which greatly helped reveal the attributes affecting all browsers. 

    I have further modified the code myself to reduce repetition.
    */

    input {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;

        &::-webkit-slider-runnable-track, &::-moz-range-track {
            background-color: #fff;
            border: 2px solid black;
            border-radius: 0;
            height: 0.5rem;
        }

        &::-webkit-slider-thumb, &::-moz-range-thumb {
            -webkit-appearance: none; /* Override default look */
            appearance: none;
            margin-top: -4px; /* Centers thumb on the track */
            background-color: #ffffff;
            border: 2px solid black;
            border-radius: 0;
            height: 1rem;
            width: 0.7rem;
        }

        &::-moz-range-progress {
            background-color: #000;
            height: 0.5rem;
        }

        &:focus {
            outline: none;

            &::-webkit-slider-thumb, &::-moz-range-thumb {
                outline: 2px solid #ffffff;
            }
        }
    }
</style>
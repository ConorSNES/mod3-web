<script lang="ts">
    import maximize from "$lib/assets/iconkit/maximize.svg";
    import minimize from "$lib/assets/iconkit/minimize.svg";
    import config from "$lib/assets/iconkit/config.svg";
    import tray from "$lib/assets/iconkit/tray.svg";
    import placeholder from "$lib/assets/placeholder.png";
    import Switch from "./component/generic/switch.svelte";
    import IconButton from "./component/generic/icon_button.svelte";

    var self: HTMLElement;

    // manage config

    let configRaised: boolean = $state(false);

    // manage display state

    function doViewportReset() {
        self.classList.remove("fullviewport");
        document.documentElement.style = "";
        document.body.style = "";
        if (document.fullscreenElement) document.exitFullscreen();
    }

    function doFullscreen() {
        doViewportReset();
        self.requestFullscreen();
    }

    function doFullviewport() {
        doViewportReset();
        self.classList.add("fullviewport");
        document.documentElement.style = "overflow:hidden; height:100vh;";
        document.body.style = "overflow:hidden; height:100vh;";
    }

    type DisplayState = 0 | 1 | 2;

    let displayState: DisplayState = $state(0 as DisplayState);

    $effect(() => {
        switch (displayState) {
            case 0:
                doViewportReset();
                break;
            case 1:
                doFullviewport();
                break;
            case 2:
                doFullscreen();
                break;
        }
    });

    // manage dark theme

    let darktheme: boolean = $state(false);
    $effect(() => {
        if (darktheme) self.classList.add("dark");
        else self.classList.remove("dark");
    });
</script>

<main id="game" bind:this={self}>
    <header>
        <span class="headerfill">placeholder</span>

        <IconButton
            src={config}
            alt="open config"
            onclick={() => (configRaised = !configRaised)}
        />

        {#if displayState == 0}
            <IconButton
                src={maximize}
                alt="maximise game"
                onclick={(e) => (displayState = e.shiftKey ? 2 : 1)}
            />
        {:else}
            <IconButton
                src={minimize}
                alt="minimise game"
                onclick={() => (displayState = 0)}
            />
        {/if}
    </header>
    <article id="gamelayers">
        <div id="cardspace">
            <img src={placeholder} alt="placeholder" />
        </div>
        <div id="config" hidden={!configRaised}>
            <div>
                <header>
                    <span class="headerfill">Game Config</span>
                    <IconButton
                        src={tray}
                        alt="minimise config menu"
                        onclick={() => (configRaised = false)}
                    />
                </header>
                <article>
                    <table>
                        <tbody>
                            <tr>
                                <td>Dark theme (invert colours)</td>
                                <td><Switch fill bind:value={darktheme} /></td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </div>
        </div>
    </article>
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap");

    #game {
        background-color: white;
        border: 2px solid black;

        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;

        box-sizing: border-box;

        :global(*) {
            font-family: "Noto Sans Mono", "Courier New", Courier, monospace;
            font-weight: 500;
        }

        header {
            display: flex;
            flex-direction: row;
            align-items: center;

            border-bottom: 2px solid black;
            height: fit-content;

            :global(> *) {
                border-left: 2px solid black;
            }

            > :first-child {
                border-left: none;
            }

            > .headerfill {
                width: 100%;
                text-align: center;
            }
        }

        &:global(.fullviewport) {
            float: left;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
        }

        /* super arbitrary dark theme */
        &:global(.dark) {
            filter: invert();
        }

        #gamelayers {
            display: grid;

            min-height: 128px;
            height: 100%;

            > * {
                grid-column: 1;
                grid-row: 1;
            }
        }

        #config {
            display: flex;
            justify-content: center;
            place-items: center;

            padding: 16px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background-image: url("./assets/dither.png");

            > * {
                border: 2px solid black;
                background: white;

                header > span {
                    font-weight: 800;
                }

                article > table {
                    border-spacing: 0;
                    font-size: 12px;

                    td {
                        padding: 0;
                        &:first-child {
                            padding: 0 16px;
                        }
                        &:last-child {
                            border-left: 2px solid black;
                        }
                    }
                }
            }

            &[hidden] {
                display: none;
            }
        }
    }
</style>

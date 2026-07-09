<script lang="ts">
    import maximize from "$lib/assets/iconkit/maximize.svg";
    import minimize from "$lib/assets/iconkit/minimize.svg";
    import config from "$lib/assets/iconkit/config.svg";
    import tray from "$lib/assets/iconkit/tray.svg";
    import create_new from "$lib/assets/iconkit/create_new.svg";
    import Switch from "./component/generic/switch.svelte";
    import IconButton from "./component/generic/icon_button.svelte";
    import ManagedGameState from "./component/managed_game_state.svelte";
    import NoSsr from "./component/generic/no_ssr.svelte";
    import GameState from "./gamestate";
    import { BrowserStored } from "./browser_stored";
    import { onMount } from "svelte";
    import DelayLoop from "./generic/delay_loop";

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

    let meta_darktheme = new BrowserStored("darktheme", false, (v) =>
        v ? v === "true" : null,
    );
    let darktheme: boolean = $state(meta_darktheme.default_val);
    onMount(() => {
        darktheme = meta_darktheme.value;
    });
    $effect(() => {
        meta_darktheme.value = darktheme;

        if (darktheme) self.classList.add("dark");
        else self.classList.remove("dark");
    });

    // start time management
    let start_time: number | null = $state(null);
    function update_start_time() {
        start_time = gamestate.starttime;
        elapsed_time_loop.start();
    }
    let elapsed_time: Date | null = $state(null);
    function update_elapsed_time() {
        elapsed_time = start_time
            ? new Date(Math.abs(Date.now() - start_time))
            : null;
    }
    const elapsed_time_loop = new DelayLoop(300, update_elapsed_time);

    // manage game state
    let meta_gamestate = new BrowserStored(
        "save",
        GameState.quick_start(),
        (v) => (v ? GameState.deserialize(v) : null),
        GameState.serialize,
    );
    let gamestate: GameState = $state(meta_gamestate.default_val);
    onMount(() => {
        gamestate = meta_gamestate.value;
        gamestate.onMut.subscribe(() => {
            update_start_time();
            meta_gamestate.value = gamestate;
        });
        update_start_time();
    });

    function new_game() {
        gamestate = GameState.quick_start();
        gamestate.onMut.subscribe(() => {
            update_start_time();
            meta_gamestate.value = gamestate;
        });
        update_start_time();
    }
</script>

<main id="game" bind:this={self}>
    <header>
        <span class={"timer " + (elapsed_time ? "" : "subtle")}>
            {#if elapsed_time}
                {elapsed_time.getUTCHours()}h {elapsed_time.getUTCMinutes()}m {elapsed_time.getUTCSeconds()}s
            {:else}
                0h 0m 0s
            {/if}
        </span>

        <span class="headerfill">placeholder</span>

        <IconButton
            src={create_new}
            alt="new game"
            title="Start a new game"
            onclick={new_game}
        />

        <IconButton
            src={config}
            alt="config"
            title="Configure game options"
            onclick={() => (configRaised = !configRaised)}
        />

        {#if displayState == 0}
            <IconButton
                src={maximize}
                alt="maximise"
                title="Maximise this game view (+shift for fullscreen)"
                onclick={(e) => (displayState = e.shiftKey ? 2 : 1)}
            />
        {:else}
            <IconButton
                src={minimize}
                alt="minimise"
                title="Return game view to normal"
                onclick={() => (displayState = 0)}
            />
        {/if}
    </header>
    <article id="gamelayers">
        <div class="panicgamebox">
            <NoSsr>
                <ManagedGameState bind:gamestate />
            </NoSsr>
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
        background-color: #fff;
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
                height: 100%;
            }

            > :first-child {
                border-left: none;
            }

            > span {
                white-space: nowrap;
                text-align: center;
                line-height: 32px;
            }

            > .headerfill {
                width: 100%;
            }

            > .timer {
                width: max-content;

                padding: 0 8px;

                &.subtle {
                    font-style: italic;
                    color: #0000008a;
                }
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

            > :global(*) {
                grid-column: 1;
                grid-row: 1;
            }

            > .panicgamebox {
                display: flex;
                place-content: center;
                place-items: center;

                overflow: auto;

                width: 100%;
                height: 100%;
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
            background: #00000080;
            backdrop-filter: blur(4px);

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

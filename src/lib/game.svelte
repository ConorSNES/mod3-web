<script lang="ts">
    import maximize from "./assets/iconkit/maximize.svg";
    import minimize from "./assets/iconkit/minimize.svg";
    import config from "./assets/iconkit/config.svg";
    import create_new from "./assets/iconkit/create_new.svg";
    import about from "./assets/iconkit/about.svg";
    import IconButton from "./component/generic/icon_button.svelte";
    import ManagedGameState from "./component/managed_game_state.svelte";
    import NoSsr from "./component/generic/no_ssr.svelte";
    import GameState from "./gamestate";
    import { BrowserStored } from "./generic/browser_stored";
    import { onMount } from "svelte";
    import DelayLoop from "./generic/delay_loop";
    import Userconfig from "./component/game-frames/userconfig.svelte";
    import { default_userconfig, patch_userconfig, setUserConfig, type UserConfig } from "./userconfig";
    import About from "./component/game-frames/about.svelte";

    var self: HTMLElement;

    // overlay management
    type RaisedOverlay = "config" | "about" | null;
    let overlayRaised = $state<RaisedOverlay>(null);
    function toggleOverlayRaised(target : RaisedOverlay) {
        overlayRaised = overlayRaised == target ? null : target
    }
    function dismissOverlayRaised() {
        overlayRaised = null;
    }

    // manage config
    const meta_userconfig = new BrowserStored<UserConfig>(
        "userconfig",
        default_userconfig,
        (v) => v ? (patch_userconfig(JSON.parse(v))) : null,
        (v) => JSON.stringify(v),
    );
    let userconfig = $state(meta_userconfig.default_val);
    onMount(() => {
        userconfig = meta_userconfig.value;
    });
    $effect(() => {
        meta_userconfig.value = userconfig;
        setUserConfig(userconfig);
    });
    
    // manage display state

    function doViewportReset() {
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
        document.documentElement.style = "overflow:hidden; height:100vh;";
        document.body.style = "overflow:hidden; height:100vh;";
    }

    type DisplayState = 0 | 1 | 2;

    const meta_displaystate = new BrowserStored<DisplayState>(
        "displaystate",
        0 as DisplayState,
        (v) =>
            v ? (Math.min(Math.max(parseInt(v), 0), 2) as DisplayState) : null,
    );
    let displayState: DisplayState = $state(meta_displaystate.default_val);
    onMount(() => (displayState = meta_displaystate.value));
    $effect(() => {
        meta_displaystate.value = displayState;
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

    // win counter
    const meta_wincount = new BrowserStored<number>(
        "wincount",
        0 as number,
        (v) => (v ? parseInt(v) : null),
    );
    let wincount = $state(meta_wincount.default_val);
    onMount(() => {
        wincount = meta_wincount.value;
    });
    $effect(() => {
        meta_wincount.value = wincount;
    });

    // timer management
    let elapsed_time: Date | null = $state(null as Date | null);
    function update_elapsed_time() {
        if (gamestate.wintime) elapsed_time_loop.break();
        elapsed_time = gamestate.starttime
            ? gamestate.wintime
                ? new Date(Math.abs(gamestate.wintime - gamestate.starttime))
                : new Date(Math.abs(Date.now() - gamestate.starttime))
            : null;
    }
    const elapsed_time_loop = new DelayLoop(300, update_elapsed_time);

    let movecount = $state(0);

    /**
     * Custom function fixing numeric to fixed length, as javascript's number formatting does not support this.
     *
     * Thank you, Simon Rigét, for your algorithm.
     * src: https://stackoverflow.com/questions/1127905/how-can-i-format-an-integer-to-a-specific-length-in-javascript
     */
    function fixed_uint_fmt(v: number, len: number): string {
        return String(v).padStart(len, "0");
    }

    // manage notifications
    let notification = $state(null as string | null);
    function notification_check() {
        if (!gamestate.is_moves_available() && !gamestate.is_won()) {
            if (gamestate.is_won()) notification = "This game has been won.";
            else notification = "There are no more moves.";
        }
    }

    // manage game state
    let meta_gamestate = new BrowserStored(
        "save",
        GameState.quick_start(),
        (v) => (v ? GameState.deserialize(v) : null),
        GameState.serialize,
    );
    let gamestate: GameState = $state(meta_gamestate.default_val);
    const gamestate_onMut = () => {
        meta_gamestate.value = gamestate;
        movecount = gamestate.movecount;
        notification_check();
        if (gamestate.is_won()) wincount++;
    };
    onMount(() => {
        gamestate = meta_gamestate.value;
        movecount = gamestate.movecount;
        gamestate.onMut.subscribe(gamestate_onMut);
        elapsed_time_loop.start();
        notification_check();
    });

    function new_game() {
        gamestate = GameState.quick_start();
        movecount = gamestate.movecount;
        gamestate.onMut.subscribe(gamestate_onMut);
        elapsed_time_loop.start();
        notification = null;
    }
</script>

<main id="game" bind:this={self} class={(userconfig.dark_theme ? "dark" : "") + (displayState === 1 ? " fullviewport" : "")}>
    <header>
        {#if userconfig.show_timer}
            <span class={"timer " + (elapsed_time ? "" : "subtle")}>
                {#if elapsed_time}
                    {Math.floor(elapsed_time.getTime() / 3600000)}h {fixed_uint_fmt(
                        elapsed_time.getUTCMinutes(),
                        2,
                    )}m {fixed_uint_fmt(elapsed_time.getUTCSeconds(), 2)}s
                {:else}
                    0h 00m 00s
                {/if}
            </span>
        {/if}

        {#if userconfig.show_movecount}
            <span class="timer">
                Moves: {movecount}
            </span>
        {/if}

        <span class="headerfill subtle">
            Mod3
        </span>

        {#if userconfig.show_wincount && wincount > 0}
            <span class="timer">Wins: {wincount}</span>
        {/if}

        <IconButton 
            src={about}
            alt="about"
            title="About"
            onclick={() => (toggleOverlayRaised("about"))}
        />

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
            onclick={() => (toggleOverlayRaised("config"))}
        />

        {#if displayState == 0}
            <IconButton
                src={maximize}
                alt="maximise"
                title="Maximise this game view (+shift for fullscreen)"
                onclick={(e) => (displayState = (e.shiftKey != userconfig.prefer_fullscreen) ? 2 : 1)}
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
        <div class="overlay" hidden={!(overlayRaised === "config")}>
            <Userconfig bind:userconfig onMinimize={dismissOverlayRaised}/>
        </div>
        <div class="overlay" hidden={!(overlayRaised === "about")}>
            <About 
                onNewGame={()=>{dismissOverlayRaised(); new_game();}}
                onResumeGame={dismissOverlayRaised}
            />
        </div>
    </article>
    {#if notification}
        <footer>
            {notification}
        </footer>
    {/if}
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
        z-index: 1;

        box-sizing: border-box;

        :global(*) {
            font-family: "Noto Sans Mono", "Courier New", Courier, monospace;
            font-weight: 500;
            color: #000;
        }

        .subtle {
            color: #0000008a;
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
                display: block;
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
                }
            }
        }

        &.fullviewport {
            float: left;
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
        }

        /* 
        super arbitrary dark theme, 
        modified to be complicated later as for some reason setting a filter on an element's parent messes with fixed positioning. 
        */
        &.dark{
            position: relative;

            &::after {
                mix-blend-mode: exclusion;
                background-color: white;
                outline: 2px solid white;

                content: "";
                display: block;
                box-sizing: border-box;
                z-index: 10000;

                position: absolute;
                width: 100%;
                height: 100%;

                user-select: none;
                -webkit-user-select: none;
                pointer-events: none;
            }
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

                overflow: hidden;

                width: 100%;
                height: 100%;
            }

            > .overlay {
                display: flex;
                justify-content: center;
                place-items: center;

                padding: 16px;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                background: #00000080;
                backdrop-filter: blur(4px);

                

                &[hidden] {
                    display: none;
                }
            }
        }

        footer {
            color: #fff;
            background: #000;

            box-sizing: border-box;
            height: 32px;
            padding: 4px;

            overflow: hidden;
            text-align: center;

            transition-property: height, color, background;
            transition-duration: 200ms;
            transition-timing-function: ease-out;

            @starting-style {
                color: #000;
                background: #fff;
                height: 0;
            }
        }
    }
</style>

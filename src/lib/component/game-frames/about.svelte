<script lang="ts">
    import Frame from "../generic/frame.svelte";

    import pck from "../../../../package.json";
    const version = pck.version;

    const {
        onNewGame = () => {},
        onResumeGame = null,
    }: {
        onNewGame?: () => void;
        onResumeGame?: (() => void) | null;
    } = $props();
</script>

<Frame pad={false}>
    <article id="info">
        <h1>mod3-web <span class="dense-info">v{version}</span></h1>
        <p>Web-based implementation of Mod3 Solitaire ruleset.</p>

        <div class="fill"></div>

        <ul class="dense-info">
            <li>
                <a href="https://github.com/ConorSNES/mod3-web">Source code</a>
            </li>
            <li>
                Program licence <a
                    href="https://www.apache.org/licenses/LICENSE-2.0"
                    >Apache 2.0</a
                >
            </li>
            <li>
                Graphics licence <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    >CC BY 4.0</a
                >
            </li>
            <li>
                © ConorSNES {new Date().getFullYear()}
            </li>
        </ul>

        <div class="btngroup">
            <button onclick={onNewGame}> New Game </button>
            {#if onResumeGame}
                <button onclick={onResumeGame}> Resume Game </button>
            {/if}
        </div>
    </article>
</Frame>

<style>
    article#info {
        display: flex;
        flex-direction: column;

        gap: 16px;
        padding: 16px;

        width: 50vw;

        .fill {
            height: 128px;
        }

        * {
            margin: 0;
        }

        h1 {
            font-weight: 800;
        }

        a {
            color: blue;
        }

        .dense-info {
            list-style: none;
            padding-left: 8px;
            font-size: 11px;
            opacity: 30%;
        }

        .btngroup {
            display: flex;
            flex-direction: column;

            gap: 8px;
        }

        button {
            box-sizing: border-box;
            cursor: pointer;
            background: white;
            padding: 4px 8px;

            transition: all 150ms ease-out;

            min-height: 32px;
            border: 2px solid black;
            font-size: 16px;
            font-weight: 800;
            text-align: start;

            &:hover,
            &:focus {
                padding-left: 16px;
                background: #e2e2e2;
                transition: none;
            }

            &:active {
                background: #bdbdbd;
                transition: none;
            }
        }
    }
</style>

<script lang="ts">
    import Frame from "../generic/frame.svelte";
    import { type UserConfig } from "../../userconfig";
    import IconButton from "../generic/icon_button.svelte";
    import tray from "../../assets/iconkit/tray.svg";
    import Switch from "../generic/switch.svelte";
    import Range from "../generic/range.svelte";

    const {
        onMinimize = () => {},
        userconfig = $bindable(),
    }: { onMinimize: () => void; userconfig: UserConfig } = $props();
</script>

<Frame pad={false}>
    <header>
        <span class="headerfill">Game Config</span>
        <IconButton
            src={tray}
            alt="minimise config menu"
            onclick={onMinimize}
        />
    </header>
    <article>
        <table>
            <tbody>
                <tr>
                    <td>Dark theme (invert colours)</td>
                    <td>
                        <Switch fill bind:value={userconfig.dark_theme} />
                    </td>
                </tr>
                <tr>
                    <td>Show timer</td>
                    <td>
                        <Switch fill bind:value={userconfig.show_timer} />
                    </td>
                </tr>
                <tr>
                    <td>Show move counter</td>
                    <td>
                        <Switch fill bind:value={userconfig.show_movecount} />
                    </td>
                </tr>
                <tr>
                    <td>Card scale</td>
                    <td>
                        <Range
                            bind:value={userconfig.card_scale}
                            min={0.1}
                            max={2.0}
                            step={0.1}
                            label
                        />
                    </td>
                </tr>
                <tr>
                    <td>Prefer fullscreen when maximizing game</td>
                    <td>
                        <Switch
                            fill
                            bind:value={userconfig.prefer_fullscreen}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </article>
</Frame>

<style>
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

            width: 100%;
            
            font-weight: 800;
        }
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

        tr:nth-child(even) {
            background: #eee;
        }
    }
</style>

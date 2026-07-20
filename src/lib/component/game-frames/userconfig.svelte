<script lang="ts">
    import Frame from "../generic/frame.svelte";
    import { type UserConfig } from "../../userconfig";
    import IconButton from "../generic/icon_button.svelte";
    import tray from "../../assets/iconkit/tray.svg";
    import Switch from "../generic/switch.svelte";
    import Range from "../generic/range.svelte";
    import { Deck_Style } from "$lib/card_to_image";

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
                    <td>Show win counter</td>
                    <td>
                        <Switch fill bind:value={userconfig.show_wincount}/>
                    </td>
                </tr>
                <tr>
                    <td>Show "about" button</td>
                    <td>
                        <Switch fill bind:value={userconfig.show_aboutmenu}/>
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
                    <td>Card style</td>
                    <td>
                        <select bind:value={userconfig.card_deck}>
                            <option value={Deck_Style.minimal}>Minimal</option>
                            <option value={Deck_Style.two_tone}>Two-tone</option>
                            <option value={Deck_Style.four_colours}>Coloured Suits</option>
                        </select>
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

    article {
        overflow-y: auto;
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
                border-left: 2px solid #0003;
            }
        }

        tr:nth-child(even) {
            background: #eee;
        }
    }

    select {
        min-height: 24px;
        width: 100%;
        border: none;

        cursor: pointer;
    }
</style>

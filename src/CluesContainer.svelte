<script lang="ts">
    import ClueColumn from "./ClueColumn.svelte";
    import ClueText from "./ClueText.svelte";
    import type { Clue, Clues } from "./api/types.svelte";

    export let clues: Clues;
    export let widthAvailable: number;
    export let setActiveClue: (clue: Clue) => void;
</script>

{#if clues != undefined}
    <div class="container">
        <div class={widthAvailable > 400 ? "sideBySide" : ""}>
            <ClueColumn clues={clues.across} title={"Across"} {setActiveClue} />
        </div>
        <div class={widthAvailable > 400 ? "sideBySide" : ""}>
            <ClueColumn clues={clues.down} title={"Down"} {setActiveClue} />
        </div>
    </div>
{/if}

<style>
    .container {
        width: 100%;
    }
    .sideBySide {
        display: inline-block;
    }
</style>

<script lang="ts">
    import type { Clue } from "./api/types.svelte";

    export let answered: boolean;
    export let clue: Clue;
</script>

<span class="number">{clue.number}</span>
<span class={answered ? "answeredClue" : "unansweredClue"}>
    {clue.surface + " (" + clue.length.toString() + ")"}
</span>

<style>
    .answeredClue {
        color: dimgrey;
        font-weight: bold;
    }
    .unansweredClue {
        color: black;
        font-weight: bold;
    }
    .number {
        font-weight: bold;
    }
</style>

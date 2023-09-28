<script lang="ts">
    import type { Clue } from "./api/types.svelte";

    export let answered: boolean;
    export let clue: Clue;
</script>

<span class="number">{clue.number}</span>
<span class="clue {answered ? 'answeredClue' : 'unansweredClue'}">
    {clue.surface}
</span>

<style>
    .clue {
	    cursor: pointer;
    }
    .answeredClue {
        color: dimgrey;
    }
    .unansweredClue {
        color: black;
    }
    .number {
        font-weight: bold;
    }
</style>

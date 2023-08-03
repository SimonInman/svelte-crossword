<script lang="ts">
    import ClueText from "./ClueText.svelte";
    import type { Clue } from "./api/types.svelte";

    export let clues: Clue[];
</script>

{#each clues as clue}
    <div>
        <ClueText {clue} answered={true} />
    </div>
{/each}

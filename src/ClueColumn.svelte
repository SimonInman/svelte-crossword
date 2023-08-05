<script lang="ts">
    import ClueText from "./ClueText.svelte";
    import type { Clue } from "./api/types.svelte";

    export let clues: Clue[];
    export let title: string;
</script>

<h3>{title}</h3>
{#each clues as clue}
    <div>
        <ClueText {clue} answered={true} />
    </div>
{/each}

<script lang="ts">
    import ClueText from "./ClueText.svelte";
    import type { Clue } from "./api/types.svelte";

    export let clues: Clue[];
    export let title: string;
    export let setActiveClue: (clue: Clue) => void;
</script>

<h3 class="cluesHeading">{title}</h3>
{#each clues as clue}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        on:click={() => {
            setActiveClue(clue);
        }}
    >
        <ClueText {clue} answered={true} />
    </div>
{/each}

<style>
  .cluesHeading {
	  margin: 4px 0;

  }
</style>

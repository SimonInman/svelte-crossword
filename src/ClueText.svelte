<script lang="ts">
  import type { Clue } from "./api/types.svelte";

  export let answered: boolean;
  export let clue: Clue;
  export let active: boolean;
</script>

<span class="number">{clue.number}</span>
<span class="clue" class:answered class:active>
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
  .active {
    font-weight: bold;
  }
</style>

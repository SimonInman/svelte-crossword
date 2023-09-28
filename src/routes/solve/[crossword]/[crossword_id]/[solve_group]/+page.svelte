<script lang="ts">
  import { onMount } from "svelte";
  import type { Square } from "../../../../../types.svelte";
  import type {
    Clue,
    Clues,
    CrosswordForStyledCellValue,
    Grid,
  } from "../../../../../api/types.svelte";
  import GridComponent from "../../../../../GridComponent.svelte";
  import CluesContainer from "../../../../../CluesContainer.svelte";
  import SelectionHeader from "../../../../../SelectionHeader.svelte";

  export let data;

  let activeRowIndex = 0;
  let activeCellIndex = 0;
  let innerWidth = 0;
  let innerHeight = 0;

  $: useHorizontalLayout = innerWidth > 700;

  $: crossword_id = data.crossword_id;

  $: serverAddress = `https://csolve.fly.dev/crossword/${data.crossword}/${crossword_id}`;

  $: serverUpdatesAddress = `https://csolve.fly.dev/solve/${data.crossword}/${crossword_id}/${data.solve_group}/get`;

  $: networkGrid = data.grid;
  let networkClues: Clues;
  $: networkClues = data.networkData.clues;

  //task for fetching grid updates.
  let poller: number | undefined;

  let activeClue: Clue | null;
  $: activeClue = null;

  const clueCoversCell = (clue: Clue, row: number, col: number) => {
    let span = clue.span_info.linear_span;
    let inSpan = span.filter((blah) => blah.column == col && blah.row == row);
    return inSpan.length > 0;
  };

  $: cluesCoveringCell = (row: number, col: number) => {
    let allClues = networkClues.across.concat(networkClues.down);
    if (!allClues) {
      return [];
    }
    return allClues.filter((clue: Clue) => clueCoversCell(clue, row, col));
  };

  const setActiveCell = (row: number, col: number) => {
    if (!networkClues) {
      return;
    }
    let potential = cluesCoveringCell(row, col);
    activeRowIndex = row;
    activeCellIndex = col;
    if (potential.length == 0) {
      // Probably shouldn't happen, but whatever
      return;
    }
    if (potential.length == 1) {
      // Probably shouldn't happen, but whatever
      activeClue = potential[0];
      return;
    }

    if (potential[0] == activeClue) {
      // Switch clues if already have this one active.
      activeClue = potential[1];
    } else {
      activeClue = potential[0];
    }
  };

  // Callback when clue clicked on
  const setActiveClue = (clue: Clue) => {
    activeRowIndex = clue.position.row;
    activeCellIndex = clue.position.column;
    activeClue = clue;
  };

  const fetchData = async () => {
    let updatesAddress = `https://csolve.fly.dev/solve/${data.crossword}/${crossword_id}/${data.solve_group}/get`;
    try {
      const response = await fetch(updatesAddress);
      let updatedGrid: Grid;
      updatedGrid = await response.json();
      networkGrid = updatedGrid;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  $: fetchUpdateAnswers(crossword_id);

  function fetchUpdateAnswers(crossword_id: string) {
    if (!crossword_id) {
      return;
    }
    // Need to use crossword_id to trigger reactivity.
    let blah = crossword_id;
    if (poller) {
      clearInterval(poller);
    }
    poller = setInterval(fetchData, 5000);
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<SelectionHeader initialSelectedCrossword={data.crossword} />

{#if networkGrid != undefined}
  {#key crossword_id}
    <div class="gridContainer {useHorizontalLayout ? 'sideBySide' : ''}">
      <GridComponent
        grid={networkGrid}
        {setActiveCell}
        {activeClue}
        initialActiveRowIndex={activeRowIndex}
        initialActiveCellIndex={activeCellIndex}
      />
    </div>
    {#if !useHorizontalLayout && activeClue}
      <div class="activeClue">
        <span>{activeClue.number}.</span>
        {" "}{activeClue.surface}
      </div>
    {/if}
    <div class="columnContainer {useHorizontalLayout ? 'sideBySide' : ''}">
      <CluesContainer
        clues={networkClues}
        widthAvailable={useHorizontalLayout ? innerWidth - 500 : innerWidth}
        {setActiveClue}
      />
    </div>
  {/key}
{/if}

<style>
  .columnContainer {
    overflow-y: scroll;
  }
  .activeClue {
    background-color: #989eff;
    width: 100vw;
    padding: 8px;
    z-index: 5;
  }
  .gridContainer {
    max-width: 500px;
  }
  .sideBySide {
    display: inline-block;
  }
</style>

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

    const serverAddress = `https://csolve.fly.dev/crossword/${data.crossword}/${data.crossword_id}`;

    const serverUpdatesAddress = `https://csolve.fly.dev/solve/${data.crossword}/${data.crossword_id}/${data.solve_group}/get`;

    $: networkGrid = data.grid;
    let networkClues: Clues;
    $: networkClues = data.networkData.clues;

    $: crossword_id = data.crossword_id;

    let activeClue: Clue | null;
    $: activeClue = null;

    const clueCoversCell = (clue: Clue, row: number, col: number) => {
        let span = clue.span_info.linear_span;
        let inSpan = span.filter(
            (blah) => blah.column == col && blah.row == row
        );
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
        if (potential.length == 0) {
            // Probably shouldn't happen, but whatever
            return;
        }
        if (potential.length == 1) {
            // Probably shouldn't happen, but whatever
            console.log("setting active clue");
            activeClue = potential[0];
            return;
        }

        if (potential[0] == activeClue) {
            // Switch clues if already have this one active.
            console.log("setting active clue");
            activeClue = potential[1];
        } else {
            console.log("setting active clue");
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
        try {
            const response = await fetch(serverUpdatesAddress);
            let updatedGrid: Grid;
            updatedGrid = await response.json();
            console.log("updatedGrid has height: " + updatedGrid.height);
            networkGrid = updatedGrid;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<SelectionHeader initialSelectedCrossword={data.crossword} />

{#if networkGrid != undefined}
    {#key crossword_id}
        {#if !useHorizontalLayout && activeClue}
            <div>{activeClue.surface}</div>
        {/if}
        <div class="gridContainer {useHorizontalLayout ? 'sideBySide' : ''}">
            <GridComponent
                grid={networkGrid}
                {setActiveCell}
                initialActiveRowIndex={activeRowIndex}
                initialActiveCellIndex={activeCellIndex}
            />
        </div>
        <div class="columnContainer {useHorizontalLayout ? 'sideBySide' : ''}">
            <CluesContainer
                clues={networkClues}
                widthAvailable={useHorizontalLayout
                    ? innerWidth - 500
                    : innerWidth}
                {setActiveClue}
            />
        </div>
    {/key}
{/if}

<style>
    .gridContainer {
        max-width: 500px;
    }
    .sideBySide {
        display: inline-block;
    }
</style>

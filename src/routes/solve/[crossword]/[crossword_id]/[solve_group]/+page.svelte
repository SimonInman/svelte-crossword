<script lang="ts">
    import { onMount } from "svelte";
    import type { Square } from "../../../../../types.svelte";
    import type {
        Clues,
        CrosswordForStyledCellValue,
        Grid,
    } from "../../../../../api/types.svelte";
    import GridComponent from "../../../../../GridComponent.svelte";
    import CluesContainer from "../../../../../CluesContainer.svelte";

    export let data;

    let activeRowIndex = 0;
    let activeCellIndex = 0;
    let innerWidth = 0;
    let innerHeight = 0;

    // Placeholder for the server address
    const serverAddress = `https://csolve.fly.dev/crossword/${data.crossword}/${data.crossword_id}`;

    const serverUpdatesAddress = `https://csolve.fly.dev/solve/${data.crossword}/${data.crossword_id}/${data.solve_group}/get`;

    let networkData: CrosswordForStyledCellValue;
    let networkGrid: Grid;
    let networkClues: Clues;

    const fetchInitialData = async () => {
        try {
            // Fetch data from the server (replace "YOUR_SERVER_ADDRESS" with the actual server URL)
            const response = await fetch(serverAddress);
            networkData = await response.json();
            console.log("fetched: " + response.body);
            networkGrid = networkData.grid;
            networkClues = networkData.clues;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchData = async () => {
        try {
            // Fetch data from the server (replace "YOUR_SERVER_ADDRESS" with the actual server URL)
            const response = await fetch(serverUpdatesAddress);
            let updatedGrid: Grid;
            updatedGrid = await response.json();
            console.log("updatedGrid has height: " + updatedGrid.height);
            networkGrid = updatedGrid;
            // networkClues = networkData.clues;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data initially and set up polling on mount
    onMount(() => {
        fetchInitialData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if networkGrid != undefined}
    <div class="gridContainer {innerWidth > 700 ? 'sideBySide' : ''}">
        <GridComponent grid={networkGrid} activeRowIndex={0} />
    </div>
    <div class="columnContainer {innerWidth > 700 ? 'sideBySide' : ''}">
        <CluesContainer
            clues={networkClues}
            widthAvailable={innerWidth > 700 ? innerWidth - 500 : innerWidth}
        />
    </div>
{/if}

<style>
    .gridContainer {
        max-width: 500px;
    }
    .sideBySide {
        display: inline-block;
    }
</style>

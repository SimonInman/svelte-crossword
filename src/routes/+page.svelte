<script lang="ts">
    // Import required modules
    import { onMount } from "svelte";
    import type { Square } from "../types.svelte";
    import type { Clue } from "../api/types.svelte";
    import ClueText from "../ClueText.svelte";
    import ClueColumn from "../ClueColumn.svelte";
    import Grid from "../Grid.svelte";
    import { dummyGrid } from "../dummy_grid";

    let activeRowIndex = 0;
    let activeCellIndex = 0;
    let innerWidth = 0;
    let innerHeight = 0;

    // Placeholder for the server address
    const serverAddress =
        "https://csolve.fly.dev/crossword/guardian-cryptic/29131";

    // Sample data for testing
    let dummy: string;
    let crosswordData: Square[][];
    let networkData;
    crosswordData = [
        // Replace this sample data with data fetched from the server
        [
            { isLit: true, content: "H" },
            { isLit: true, content: "E" },
            { isLit: true, content: "L" },
            { isLit: true, content: "L" },
            { isLit: true, content: "O" },
        ],
        [
            { isLit: true, content: null },
            { isLit: false, content: null },
            { isLit: false, content: null },
            { isLit: true, content: null },
            { isLit: true, content: null },
        ],
        [
            { isLit: true, content: null },
            { isLit: false, content: null },
            { isLit: false, content: null },
            { isLit: true, content: null },
            { isLit: true, content: null },
        ],
        [
            { isLit: true, content: "W" },
            { isLit: true, content: null },
            { isLit: false, content: null },
            { isLit: true, content: null },
            { isLit: true, content: null },
        ],
        [
            { isLit: true, content: null },
            { isLit: true, content: null },
            { isLit: true, content: null },
            { isLit: true, content: null },
            { isLit: true, content: "D" },
        ],
    ];

    let dummySpan = {
        linear_span: [
            {
                row: 7,
                column: 6,
            },
            {
                row: 7,
                column: 7,
            },
            {
                row: 7,
                column: 8,
            },
        ],
        full_span: [
            {
                row: 7,
                column: 6,
            },
            {
                row: 7,
                column: 7,
            },
            {
                row: 7,
                column: 8,
            },
        ],
        overflow_clues: [],
        underflow_clues: [],
    };
    let dummyClues: Clue[];
    dummyClues = [
        {
            number: 1,
            surface: "clue 1",
            length: 5,
            span_info: dummySpan,
            position: {
                row: 7,
                column: 6,
            },
        },
        {
            number: 2,
            surface: "clue 2",
            length: 5,
            span_info: dummySpan,
            position: {
                row: 7,
                column: 6,
            },
        },
        {
            number: 3,
            surface: "clue three",
            length: 5,
            span_info: dummySpan,
            position: {
                row: 7,
                column: 6,
            },
        },
    ];

    // Fetch data initially and set up polling on mount
    // onMount(() => {
    //     fetchData();
    //     const interval = setInterval(fetchData, 5000);
    //     return () => clearInterval(interval);
    // });
    const isActive = (rowIndex: number, cellIndex: number) => {
        return rowIndex === activeRowIndex && cellIndex === activeCellIndex;
    };

    const fetchData = async () => {
        try {
            // Fetch data from the server (replace "YOUR_SERVER_ADDRESS" with the actual server URL)
            const response = await fetch(serverAddress);
            networkData = await response.json();
            console.log("fetched: " + response.body);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data initially and set up polling on mount
    onMount(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="gridContainer {innerWidth > 700 ? 'sideBySide' : ''}">
    <Grid grid={dummyGrid} activeRowIndex={0} />
</div>
<div class="columnContainer {innerWidth > 700 ? 'sideBySide' : ''}">
    <ClueColumn clues={dummyClues} />
</div>

<style>
    .gridContainer {
        max-width: 500px;
    }
    .sideBySide {
        display: inline-block;
    }
    .square {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        font-size: 18px;
        text-transform: uppercase;
        text-align: center;
    }

    .lit {
        background-color: #fff;
    }

    .unlit {
        background-color: #000;
        color: #fff;
    }
</style>

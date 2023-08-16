<script lang="ts">
    import GridSquare from "./GridSquare.svelte";
    import type { Grid } from "./api/types.svelte";
    import type { CellForStyledCellValue } from "./api/types.svelte";
    import type { Square } from "./types.svelte";

    export let grid: Grid;
    export let initialActiveRowIndex = 0;
    export let initialActiveCellIndex = 0;
    export let setActiveCell: (row: number, col: number) => void;

    $: activeRowIndex = initialActiveRowIndex;
    $: activeCellIndex = initialActiveCellIndex;

    let cellHeight: number;
    $: fontSize = cellHeight * 0.6;
    let emptyRow = () => {
        let out = new Array(grid.width).fill(null);
        return out;
    };
    let inputElements: (GridSquare | null)[][] = [];
    inputElements = new Array(grid.height).fill(emptyRow());

    const gridCellValue = (cell: CellForStyledCellValue) => {
        if (cell.value == "Closed") {
            return null;
        }
        if (cell.value == "Open") {
            return null;
        }

        return cell.value.FilledChar.value;
    };

    function convertCell(cell: CellForStyledCellValue): Square {
        return {
            isLit: cell.value != "Closed",
            content: gridCellValue(cell),
            clueNumber: cell.number,
        };
    }

    function convertRow(cells: CellForStyledCellValue[]): Square[] {
        return cells.map((cell) => convertCell(cell));
    }
    let displaySquares: Square[][];
    $: displaySquares = grid.cells.map((row) => convertRow(row));

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key.startsWith("Arrow")) {
            console.log(event.key);
            event.preventDefault(); // Prevent browser default behavior for arrow keys

            const { key } = event;

            // Calculate the new rowIndex and cellIndex based on the arrow key pressed
            let newRowIndex = activeRowIndex;
            let newCellIndex = activeCellIndex;

            switch (key) {
                case "ArrowRight":
                    newCellIndex += 1;
                    break;
                case "ArrowLeft":
                    newCellIndex -= 1;
                    break;
                case "ArrowDown":
                    newRowIndex += 1;
                    break;
                case "ArrowUp":
                    newRowIndex -= 1;
                    break;
                default:
                    return; // If any other key is pressed, ignore it
            }

            // Check for grid boundaries and ensure the newRowIndex and newCellIndex are within valid ranges
            const numRows = grid.height;
            const numCells = grid.width;
            if (
                newRowIndex < 0 ||
                newRowIndex >= numRows ||
                newCellIndex < 0 ||
                newCellIndex >= numCells
            ) {
                return; // Do not move if the new cell is outside the grid boundaries
            }

            if (grid.cells[newRowIndex][newCellIndex].value == "Closed") {
                return; // Don't move if we'd be moving into a dark square.
            }

            // Update the active cell's rowIndex and cellIndex
            activeRowIndex = newRowIndex;
            activeCellIndex = newCellIndex;
            setActiveCell(activeRowIndex, activeCellIndex);
        }
    };
</script>

{#each displaySquares as row, rowIndex}
    <div class="row" bind:clientHeight={cellHeight}>
        {#each row as square, cellIndex}
            <GridSquare
                {fontSize}
                isActive={rowIndex === activeRowIndex &&
                    cellIndex === activeCellIndex}
                {square}
            />
        {/each}
    </div>
{/each}

<svelte:window on:keydown={onKeyDown} />

<style>
    .row {
        display: flex;
    }
</style>

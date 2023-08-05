<script lang="ts">
    import type { Grid } from "./api/types.svelte";
    import type { CellForStyledCellValue } from "./api/types.svelte";
    import type { Square } from "./types.svelte";

    export let grid: Grid;
    export let activeRowIndex = 0;
    export let activeCellIndex = 0;

    let square: Square;
    let inputElements: (HTMLInputElement | null)[][] = [];
    //todo should be generic in size of xword.
    inputElements[0] = [];
    inputElements[1] = [];
    inputElements[2] = [];
    inputElements[3] = [];
    inputElements[4] = [];
    inputElements[5] = [];
    inputElements[6] = [];
    inputElements[7] = [];
    inputElements[8] = [];
    inputElements[9] = [];
    inputElements[10] = [];
    inputElements[11] = [];
    inputElements[12] = [];
    inputElements[13] = [];
    inputElements[14] = [];

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
        return { isLit: cell.value != "Closed", content: gridCellValue(cell) };
    }

    function convertRow(cells: CellForStyledCellValue[]): Square[] {
        return cells.map((cell) => convertCell(cell));
    }
    let displaySquares: Square[][];
    $: displaySquares = grid.cells.map((row) => convertRow(row));

    const isActive = (rowIndex: number, cellIndex: number) => {
        return rowIndex === activeRowIndex && cellIndex === activeCellIndex;
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key.startsWith("Arrow")) {
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

            // Set focus on the new active cell to allow keyboard input
            if (
                inputElements[activeRowIndex] &&
                inputElements[activeRowIndex][activeCellIndex]
            ) {
                const activeCell =
                    inputElements[activeRowIndex][activeCellIndex];
                console.log(
                    "setting active cell to" +
                        activeRowIndex +
                        " " +
                        activeCellIndex
                );
                activeCell.focus();
            }
        }
    };
</script>

{#each displaySquares as row, rowIndex}
    <div class="row">
        {#each row as square, cellIndex}
            <input
                class="square {square.isLit ? 'lit' : 'unlit'} {isActive(
                    rowIndex,
                    cellIndex
                )
                    ? 'active'
                    : ''}"
                type="text"
                bind:value={square.content}
                readonly={!square.isLit}
                bind:this={inputElements[rowIndex][cellIndex]}
            />
        {/each}
    </div>
{/each}

<svelte:window on:keydown={onKeyDown} />

<style>
    .row {
        display: flex;
    }
    .row input {
        flex: 1;
        box-sizing: border-box; /* ensures padding and border are included in the element's total width */
    }
    .square {
        align-items: center;
        justify-content: center;
        aspect-ratio: 1/1;
        min-width: 0;
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

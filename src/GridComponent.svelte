<script lang="ts">
  import GridSquare from "./GridSquare.svelte";
  import type { CellStyle, Clue, Grid } from "./api/types.svelte";
  import type { CellForStyledCellValue } from "./api/types.svelte";
  import type { Square } from "./types.svelte";

  export let grid: Grid;
  export let initialActiveRowIndex = 0;
  export let initialActiveCellIndex = 0;
  export let setActiveCell: (row: number, col: number) => void;
  export let activeClue: Clue | null;
  export let setCell: (row: number, col: number, value: string) => void;

  $: activeRowIndex = initialActiveRowIndex;
  $: activeCellIndex = initialActiveCellIndex;

  $: isPartOfCurrentClue = (targetRow: number, targetColumn: number) => {
    if (activeClue === null) return false;
    return activeClue.span_info.full_span.some(({ row, column }) => {
      return row == targetRow && column == targetColumn;
    });
  };

  let cellHeight: number;
  $: fontSize = cellHeight * 0.6;
  let emptyRow = () => {
    let out = new Array(grid.width).fill(null);
    return out;
  };
  let inputElements: (GridSquare | null)[][] = [];
  inputElements = new Array(grid.height).fill(emptyRow());

  const gridCellStyle = (cell: CellForStyledCellValue): CellStyle | null => {
    if (cell.value == "Closed") {
      return null;
    }
    if (cell.value == "Open") {
      return null;
    }
    if (cell.value.FilledChar.style == undefined) {
      return null;
    }

    return cell.value.FilledChar.style;
  };

  const gridCellValue = (cell: CellForStyledCellValue) => {
    if (cell.value == "Closed") {
      return null;
    }
    if (cell.value == "Open") {
      return null;
    }

    return cell.value.FilledChar.value!;
  };

  function convertCell(cell: CellForStyledCellValue): Square {
    return {
      isLit: cell.value != "Closed",
      content: gridCellValue(cell),
      clueNumber: cell.number,
      userStyle: gridCellStyle(cell),
      hasRightBar: cell.across_word_end == null ? false : true,
      hasBottomBar: cell.down_word_end == null ? false : true,
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
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="cell"
        on:click={() => {
          if (square.isLit) {
            setActiveCell(rowIndex, cellIndex);
          }
        }}
      >
        <GridSquare
          {fontSize}
          isActive={rowIndex === activeRowIndex &&
            cellIndex === activeCellIndex}
          isPartOfCurrentClue={isPartOfCurrentClue(rowIndex, cellIndex)}
          {square}
          updateCell={(newValue) => setCell(rowIndex, cellIndex, newValue)}
        />
      </div>
    {/each}
  </div>
{/each}

<svelte:window on:keydown={onKeyDown} />

<style>
  .row {
    display: flex;
  }
  .cell {
    flex: 1;
  }
</style>

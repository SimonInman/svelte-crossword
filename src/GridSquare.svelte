<script lang="ts">
  import type { Square } from "./types.svelte";

  export let fontSize: number;
  export let isActive: boolean;
  export let isPartOfCurrentClue: boolean;
  export let square: Square;
  export let updateCell: (newValue: string) => void;

  let inputElement: HTMLInputElement | null;
  $: if (isActive && inputElement) {
    inputElement.focus();
  }

  /**
   * Handles the input event for the crossword input.
   * @param {Event & { currentTarget: EventTarget & HTMLInputElement }} event - The input event.
   */
  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const target = event.currentTarget;
    if (target) {
      // todo check delete works
      const inputChar = target.value
        ? target.value.slice(-1).toUpperCase()
        : "";
      square.content = inputChar;
      updateCell(inputChar);
    }
  }

  const cellBackground = (square: Square) => {
    if (square.userStyle != null) {
      const colour = square.userStyle.colour;
      return `rgb(${colour.red} ${colour.green} ${colour.blue} / 0.1)`;
    } else {
      return "white";
    }
  };

  $: backgroundColour = isActive
    ? "green"
    : isPartOfCurrentClue
      ? "#ccffcc"
      : cellBackground(square);
</script>

<div
  class="cell-container"
  style="border-bottom-width: {square.hasBottomBar ? '2.5px' : '1px'};
border-right-width: {square.hasRightBar ? '2.5px' : '1px'};"
>
  {#if square.isLit}
    <input
      style="font-size: {fontSize}px; background-color: {backgroundColour};"
      class="lit"
      class:active={isActive}
      type="text"
      bind:value={square.content}
      on:input={handleInput}
      readonly={!square.isLit}
      bind:this={inputElement}
    />
  {:else}
    <div class="unlit"></div>
  {/if}
  {#if square.clueNumber}
    <p style="font-size: {fontSize * 0.5}px" class="clue-number-text">
      {square.clueNumber}
    </p>
  {/if}
</div>

<style>
  .lit {
    width: 100%;
    height: 100%;
    text-align: center;
    border: 0;
  }
  .lit:focus {
    outline: none;
  }
  .lit:hover {
    cursor: pointer;
  }
  .cell-container {
    position: relative;
    aspect-ratio: 1/1;
    min-width: 0;
    min-height: 0;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    min-width: 0;
    min-height: 0;
    border: solid #000;
    border-width: 1px;
    font-size: 18px;
    text-transform: uppercase;
    text-align: center;
  }
  .clue-number-text {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }

  .unlit {
    background-color: #000;
    color: #fff;
    width: 100%;
    height: 100%;
    border: 0;
  }
  input[type="text"] {
    -webkit-appearance: none;
    border-radius: 0;
  }
</style>

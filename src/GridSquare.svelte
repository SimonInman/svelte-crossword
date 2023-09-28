<script lang="ts">
    import type { Square } from "./types.svelte";

    export let fontSize: number;
    export let isActive: boolean;
    export let isPartOfCurrentClue: boolean;
    export let square: Square;
    // export let inputElement: HTMLInputElement | null;

    let inputElement: HTMLInputElement | null;
    $: if (isActive && inputElement) {
        inputElement.focus();
    }

    $: backgroundColour = isActive ? "green" : isPartOfCurrentClue ? "#ccffcc" : "white"
</script>

<div class="cell-container">
    {#if square.isLit}
    <input
        style="font-size: {fontSize}px; background-color: {backgroundColour};"
        class="lit {isActive ? 'active' : ''}"
        type="text"
        bind:value={square.content}
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
    input {
        width: 100%;
        height: 100%;
        text-align: center;
        border: 0;
    }
    input:focus {
	    outline: none;
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
        border: 1px solid #000;
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
        /* Add other styles as needed */
    }

    /* .square {
        align-items: center;
        justify-content: center;
        aspect-ratio: 1/1;
        min-width: 0;
        min-height: 0;
        border: 1px solid #000;
        font-size: 18px;
        text-transform: uppercase;
        text-align: center;
    } */
    .lit {
        background-color: #fff;
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

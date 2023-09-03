<script lang="ts">
    import type { Square } from "./types.svelte";

    export let fontSize: number;
    export let isActive: boolean;
    export let square: Square;
    // export let inputElement: HTMLInputElement | null;

    let inputElement: HTMLInputElement | null;
    $: if (isActive && inputElement) {
        inputElement.focus();
    }
</script>

<div class="cell-container">
    <input
        style="font-size: {fontSize}px"
        class="{square.isLit ? 'lit' : 'unlit'} {isActive ? 'active' : ''}"
        disabled={square.isLit ? false : true}
        type="text"
        bind:value={square.content}
        readonly={!square.isLit}
        bind:this={inputElement}
    />
    {#if square.clueNumber}
        <p style="font-size: {fontSize * 0.5}px" class="clue-number-text">
            {square.clueNumber}
        </p>
    {/if}
</div>

<style>
    input {
        flex: 1;
        box-sizing: border-box; /* ensures padding and border are included in the element's total width */
        width: 100%;
        height: 100%;
        text-align: center;
        border: 0;
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
    }
    input[type="text"] {
        -webkit-appearance: none;
        border-radius: 0;
    }
</style>

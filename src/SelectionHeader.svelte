<script lang="ts">
    import { onMount } from "svelte";
    import type { Suggestion } from "./api/types.svelte";
    import { goto } from "$app/navigation";

    export let initialSelectedCrossword: string;

    let options1: string[] = ["guardian-cryptic", "guardian-quiptic"];
    let selectedOption1: string = initialSelectedCrossword;
    let suggestions: Suggestion[] = [];
    let selectedOption2: string;

    onMount(async () => {
        handleCrosswordChange();
    });

    async function handleCrosswordChange() {
        const response = await fetch(
            `https://csolve.fly.dev/suggestions/${selectedOption1}`
        );
        suggestions = await response.json();
        console.log("feched options2: " + suggestions);
        if (suggestions) {
            selectedOption2 = suggestions[0].id;
        }
    }

    function handleOption2Change({ detail }: { detail: string }) {
        selectedOption2 = detail;
    }

    function handleClick() {
        goto(`/solve/${selectedOption1}/${selectedOption2}/the-everymen`);
    }
</script>

<div>
    <select
        bind:value={selectedOption1}
        on:change={() => handleCrosswordChange()}
    >
        {#each options1 as source}
            <option value={source}>
                {source}
            </option>
        {/each}
    </select>

    <select bind:value={selectedOption2}>
        {#each suggestions as suggestion}
            <option value={suggestion.id}>
                {suggestion.id} ({suggestion.helpful_tag})
            </option>
        {/each}
    </select>

    <button on:click={handleClick}>Solve!</button>
</div>

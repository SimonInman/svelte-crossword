<script lang="ts">
  import { onMount } from "svelte";
  import type { Suggestion } from "./api/types.svelte";
  import { goto } from "$app/navigation";

  export let initialSelectedCrossword: string;

  let selectedOption1: string = initialSelectedCrossword;
  let suggestions: Suggestion[] = [];
  let selectedOption2: string;

  onMount(async () => {
    handleCrosswordChange();
  });

  async function handleCrosswordChange() {
    console.log("fetching for source: " + selectedOption1);
    const response = await fetch(
      `https://csolve.fly.dev/suggestions/${selectedOption1}`,
    );
    suggestions = await response.json();
    if (suggestions) {
      selectedOption2 = suggestions[0].id;
    }
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
    <optgroup label="Cryptic">
      <option value="guardian-cryptic">Guardian</option>
      <option value="guardian-prize">Guardian Prize</option>
      <option value="guardian-quiptic">Guardian Quiptic</option>
      <option value="guardian-everyman">Guardian Everyman</option>
      <option value="ft">Financial Times</option>
      <option value="the-times">The Times</option>
      <option value="the-times-quick">The Times Quick</option>
      <option value="the-times-jumbo">The Times Jumbo</option>
      <option value="independent">Independent</option>
      <option value="independent-on-sunday">Independent on Sunday</option>
      <option value="private-eye">Private Eye</option>
      <option value="the-hindu">The Hindu</option>
      <option value="the-saturday-paper">The Saturday Paper</option>
      <option value="viz">Viz</option>
      <option value="guardian-azed">Guardian Azed</option>
      <option value="mycrossword">MyCrossword</option>
    </optgroup>
    <optgroup label="American Style">
      <option value="nyt">New York Times</option>
      <option value="wapo">Washington Post</option>
      <option value="new-yorker">New Yorker</option>
      <option value="guardian-american-style">Guardian</option>
      <option value="le-monde">Le Monde</option>
      <option value="el-pais">El Pais</option>
    </optgroup>
    <optgroup label="Simple">
      <option value="guardian-quick">Guardian</option>
      <option value="independent-concise">Independent</option>
    </optgroup>
    <optgroup label="Misc">
      <option value="ft-sunday">FT Sunday</option>
    </optgroup>
    <option value="misc">Manual</option>
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

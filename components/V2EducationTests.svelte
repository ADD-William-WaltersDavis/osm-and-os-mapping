<script>
  import {
    RasterTileSource,
    RasterLayer,
    hoverStateFilter,
  } from "svelte-maplibre";

  // let url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/v2_tests/pmtiles/`;
  // let url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/v2_tests/pmtiles/just_first_secondary.pmtiles`;
  function modes() {
    return ["walk", "pt"];
  }
  function scaling_methods() {
    return ["percentage_of_max", "scaled_by_population"];
  }
  function number_selection() {
    return ["just_first", "first_five", "first_20", "all"];
  }
  function diminshing_returns_scalings() {
    return [1, 1.3, 2];
  }
  function subpurposes() {
    return ["primary", "secondary", "send", "private", "education"];
  }

  let mode = "walk";
  let scaling_method = "percentage_of_max";
  let number_selected = "just_first";
  let diminshing_returns_scaling = 1;
  let subpurpose = "primary";

  let number_to_url_val = {
    just_first: 1,
    first_five: 5,
    first_20: 20,
    all: -1,
  };

  $: url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/v2_tests/${mode}/pmtiles/${mode}/${scaling_method}_${number_to_url_val[number_selected]}_${diminshing_returns_scaling}_${subpurpose}.pmtiles`;

  $: {
    if (number_selected === "just_first") {
      diminshing_returns_scaling = 1;
    }
  }
</script>

<RasterTileSource {url}>
  <RasterLayer
    type="raster"
    paint={{
      "raster-opacity": 0.85,
    }}
    beforeId="ferry"
  />
</RasterTileSource>

<div class="whitebox">
  Mode:
  <select class="govuk-select" bind:value={mode}>
    {#each modes() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <br />
  <br />
  Subpurpose/Purpose:
  <select class="govuk-select" bind:value={subpurpose}>
    {#each subpurposes() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <br />
  <br />
  Scaling method:
  <select class="govuk-select" bind:value={scaling_method}>
    {#each scaling_methods() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <br />
  <br />
  Destinations to find:
  <select class="govuk-select" bind:value={number_selected}>
    {#each number_selection() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <br />
  <br />
  {#if number_selected !== "just_first"}
    Dimishing scaling:
    <select class="govuk-select" bind:value={diminshing_returns_scaling}>
      {#each diminshing_returns_scalings() as x}
        <option value={x}>{x}</option>
      {/each}
    </select>
    <br />
    <br />
  {/if}
</div>

<style>
  .whitebox {
    position: absolute;
    top: 5px;
    left: 50px;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px 15px 0 15px;
    border-radius: 10px;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    width: 350px;
    font-size: large;
    padding-bottom: 10px;
  }
</style>

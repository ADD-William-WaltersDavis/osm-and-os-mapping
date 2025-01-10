<script>
  import {
    RasterTileSource,
    RasterLayer,
    VectorTileSource,
    CircleLayer,
    hoverStateFilter,
  } from "svelte-maplibre";
  import ScoreLegend from "./ScoreLegend.svelte";

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
    return ["None", "Log", "1/1.3^n (moderate)", "1/2^n (aggressive)"];
  }
  function subpurposes() {
    return ["primary", "secondary", "send", "private", "education"];
  }

  let mode = "pt";
  let scaling_method = "percentage_of_max";
  let number_selected = "all";
  let diminshing_returns_scaling = "Log";
  let subpurpose = "education";
  let toggle_schools = false;
  let hovered = null;

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  window.addEventListener("mousemove", handleMouseMove);

  let number_to_url_val = {
    just_first: 1,
    first_five: 5,
    first_20: 20,
    all: -1,
  };
  let diminshing_to_url_val = {
    None: 1,
    "1/1.3^n (moderate)": 1.3,
    "1/2^n (aggressive)": 2,
    Log: "log",
  };

  $: url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/v2_tests/${mode}/pmtiles/${mode}/${scaling_method}_${number_to_url_val[number_selected]}_${diminshing_to_url_val[diminshing_returns_scaling]}_${subpurpose}.pmtiles`;
  let schools_points_url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/v2_tests/school_points.pmtiles`;

  $: {
    if (number_selected === "just_first") {
      diminshing_returns_scaling = "None";
    }
  }
  $: {
    if (mode === "walk" && diminshing_returns_scaling === "Log") {
      // write error message to user
      alert(
        "I haven't calculated the log scores for walking yet. \nPlease select a different diminshing returns function"
      );
      diminshing_returns_scaling = "None";
    }
  }
  const schoolColorMapping = [
    "match",
    ["get", "school"],
    "primary",
    "white",
    "secondary",
    "green",
    "send",
    "cyan",
    "private",
    "red",
    /* default */ "gray",
  ];
</script>

{#if toggle_schools}
  <VectorTileSource url={schools_points_url}>
    <CircleLayer
      sourceLayer={"schools"}
      type="circle"
      paint={{
        "circle-radius": 5,
        "circle-color": schoolColorMapping,
        // "circle-opacity": 0.6,
        "circle-stroke-width": 3,
        "circle-stroke-color": "black",
      }}
      filter={[
        "any",
        [
          "all",
          ["==", ["literal", subpurpose], "education"],
          [
            "in",
            ["get", "school"],
            ["literal", ["primary", "secondary", "send", "private"]],
          ],
        ],
        ["==", ["get", "school"], subpurpose],
      ]}
      bind:hovered
    />
  </VectorTileSource>
{/if}

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
  <ScoreLegend />
  <br />
  Mode:
  <select class="govuk-select" bind:value={mode}>
    {#each modes() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <button class="tooltip"
    >?
    <span class="tooltiptext"
      >Mode is either set to pt (public transport) or walk, will potentially add
      cycling/car in the future if needed</span
    >
  </button>
  <br />
  <br />
  Subpurpose/Purpose:
  <select class="govuk-select" bind:value={subpurpose}>
    {#each subpurposes() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <button class="tooltip"
    >?
    <span class="tooltiptext"
      >The subpurposes have a weighted average applied to them to calculate
      overall education. The weightings are done by the number of pupils in each
      of the school subpurposes. Roughly 50% primary, 40% secondary, 6% private
      and 4% SEND
    </span>
  </button>
  <br />
  <br />
  National score scaling method:
  <select class="govuk-select" bind:value={scaling_method}>
    {#each scaling_methods() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <button class="tooltip"
    >?
    <span class="tooltiptext"
      >The national score scaling method is how the calculated scores are
      converted into final scores for each square.
      <br />
      <b>Percentage of max</b> is simply each square score divided by the
      maximum score and rounded to the nearest integer.
      <br />
      <b>Scaled by population</b> is done by ordering all residences scores and having
      the top 1% having a score of 100, then the next 1% having a score of 99 and
      so on. Then we use these bounds to apply to all the squares whether they have
      residences in or not.
    </span>
  </button>
  <br />
  <br />
  Destinations counted:
  <select class="govuk-select" bind:value={number_selected}>
    {#each number_selection() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <button class="tooltip"
    >?
    <span class="tooltiptext"
      >For destination counted we either only accept the first, first five,
      first 20 or we accept them all.
    </span>
  </button>
  <br />
  <br />
  {#if number_selected !== "just_first"}
    Dimishing returns function:
    <select class="govuk-select" bind:value={diminshing_returns_scaling}>
      {#each diminshing_returns_scalings() as x}
        <option value={x}>{x}</option>
      {/each}
    </select>
    <button class="tooltip"
      >?
      <span class="tooltiptext"
        >The diminshing function is the value added for each time you reach a
        destination after the first time.
        <br />
        <b>None</b> is no diminshing returns so each destination has no
        multiplier applied to it.
        <br />
        <b>1/1.3^n</b> is a moderate diminshing returns function where each
        destination is worth 1/(1.3^n) where n is the number of times you have
        visited that destination.
        <br />
        <b>1/2^n</b> is an aggressive diminshing returns function where each
        destination is worth 1/(2^n) where n is the number of times you have
        visited that destination.
        <br />
        <b>Log</b> is the current method we use where we add each value on and then
        take log(total_score) of it at the end.
      </span>
    </button>
    <br />
    <br />
  {/if}
  <button
    class="govuk-button"
    on:click={() => {
      toggle_schools = !toggle_schools;
    }}
  >
    Toggle school locations
  </button>
</div>

<div
  class="hoverbox"
  style="top: {mouseY}px; left: {mouseX}px; font-size: large;"
  hidden={!hovered}
>
  {hovered?.properties?.school}
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
    width: 450px;
    font-size: large;
    padding-bottom: 10px;
  }
  .tooltip {
    position: relative;
  }
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 320px;
    background-color: #555;
    color: #fff;
    text-align: left;
    padding: 6px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .hoverbox {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    padding: 5px;
    pointer-events: none;
    opacity: 0.85;
  }
</style>

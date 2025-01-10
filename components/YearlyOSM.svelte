<script>
  import {
    VectorTileSource,
    LineLayer,
    hoverStateFilter,
  } from "svelte-maplibre";

  let url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/yearly-osm/gb/20`;

  let layerConfigs = [
    { name: "cycling_14", suffix: "14-cycling.pmtiles", colour: "#b24aff" },
    { name: "walking_14", suffix: "14-walk.pmtiles", colour: "#7030a0" },
    { name: "cycling_15", suffix: "15-cycling.pmtiles", colour: "#00ffff" },
    { name: "walking_15", suffix: "15-walk.pmtiles", colour: "#00c7c7" },
    { name: "cycling_16", suffix: "16-cycling.pmtiles", colour: "#ffc04e" },
    { name: "walking_16", suffix: "16-walk.pmtiles", colour: "#ffa500" },
    { name: "cycling_17", suffix: "17-cycling.pmtiles", colour: "#4f4fd0" },
    { name: "walking_17", suffix: "17-walk.pmtiles", colour: "#0000c7" },
    { name: "cycling_18", suffix: "18-cycling.pmtiles", colour: "#ff7979" },
    { name: "walking_18", suffix: "18-walk.pmtiles", colour: "#ff0000" },
    { name: "cycling_19", suffix: "19-cycling.pmtiles", colour: "#b24aff" },
    { name: "walking_19", suffix: "19-walk.pmtiles", colour: "#7030a0" },
    { name: "cycling_20", suffix: "20-cycling.pmtiles", colour: "#00ffff" },
    { name: "walking_20", suffix: "20-walk.pmtiles", colour: "#00c7c7" },
    { name: "cycling_21", suffix: "21-cycling.pmtiles", colour: "#ffc04e" },
    { name: "walking_21", suffix: "21-walk.pmtiles", colour: "#ffa500" },
    { name: "cycling_22", suffix: "22-cycling.pmtiles", colour: "#4f4fd0" },
    { name: "walking_22", suffix: "22-walk.pmtiles", colour: "#0000c7" },
    { name: "cycling_23", suffix: "23-cycling.pmtiles", colour: "#ff7979" },
    { name: "walking_23", suffix: "23-walk.pmtiles", colour: "#ff0000" },
    { name: "cycling_24", suffix: "24-cycling.pmtiles", colour: "#cc0000" },
    { name: "walking_24", suffix: "24-walk.pmtiles", colour: "#990000" },
  ];

  let layers = {};
  for (let config of layerConfigs) {
    layers[config.name] = {
      toggle: null,
      url: url + config.suffix,
      colour: config.colour,
    };
  }
  function year_layers() {
    let layers_ = [];
    for (let i = 0; i < layerConfigs.length; i++) {
      layers_.push(layerConfigs[i].name);
    }
    return layers_;
  }

  let comparisonA = "walking_19";
  let comparisonB = "walking_24";

  $: {
    for (const [key, _] of Object.entries(layers)) {
      layers[key].toggle = null;
      if (key === comparisonA) {
        layers[key].colour = "blue";
        layers[key].toggle = true;
      }
      if (key === comparisonB) {
        layers[key].colour = "red";
        layers[key].toggle = true;
      }
    }
  }
</script>

{#each Object.keys(layers) as layer}
  {#if layers[layer].toggle}
    <VectorTileSource url={layers[layer].url}>
      <LineLayer
        sourceLayer={"year"}
        type="line"
        paint={{
          "line-width": hoverStateFilter(3, 4),
          "line-opacity": hoverStateFilter(0.5, 1),
          "line-color": layers[layer].colour,
        }}
        manageHoverState
      />
    </VectorTileSource>
  {/if}
{/each}

<div class="whitebox">
  Compare A to B:
  <br />
  <br />
  A:
  <select class="govuk-select" bind:value={comparisonA}>
    {#each year_layers() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <div
    style="display: inline-block; width: 50px; height: 6px; background-color: blue; margin-left: 5px; margin-bottom: 4px;"
  />
  <br />
  <br />
  B:
  <select class="govuk-select" bind:value={comparisonB}>
    {#each year_layers() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
  <div
    style="display: inline-block; width: 50px; height: 6px; background-color: red; margin-left: 5px; margin-bottom: 4px;"
  />
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

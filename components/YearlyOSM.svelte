<script>
  import {
    VectorTileSource,
    LineLayer,
    hoverStateFilter,
  } from "svelte-maplibre";

  let url = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/yearly-osm/england/20`;

  let layerConfigs = [
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
  {#each Object.keys(layers) as layer}
    <label>
      <input type="checkbox" bind:checked={layers[layer].toggle} />
      Show {layer}
      <div style="display: inline-block; width: 50px; height: 6px; background-color: {layers[layer].colour}; margin-left: 5px; margin-bottom: 4px;"></div>
    </label>
    <br />
  {/each}
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
    width: 250px;
    font-size: large;
    padding-bottom: 10px;
  }
</style>



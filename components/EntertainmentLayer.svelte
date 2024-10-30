<script>
  import {
    VectorTileSource,
    FillLayer,
    CircleLayer,
    LineLayer,
  } from "svelte-maplibre";

  export let TILE_BUCKET;

  let polygon = `pmtiles://${TILE_BUCKET}/entertainment_polygon.pmtiles`;
  let point = `pmtiles://${TILE_BUCKET}/entertainment_point.pmtiles`;
  let hovered = null;

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = event.clientX + 10;
    mouseY = event.clientY + 10;
  }

  window.addEventListener("mousemove", handleMouseMove);

  let subpurpose_colour_lookup = [
    "green",
  ];
</script>

<VectorTileSource url={polygon}>
  <FillLayer
    sourceLayer={"entertainment_polygon"}
    type="fill"
    paint={{
      "fill-color": "aqua",
      "fill-opacity": 0.6,
    }}
    bind:hovered
  />
  <LineLayer
    sourceLayer={"entertainment_polygon"}
    type="line"
    paint={{
      "line-color": "black",
      "line-width": 2,
    }}
  />
</VectorTileSource>

<VectorTileSource url={point}>
  <CircleLayer
    sourceLayer={"entertainment_point"}
    type="circle"
    paint={{
      "circle-radius": 10,
      "circle-color": "aqua",
      "circle-opacity": 0.6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "black",
    }}
    bind:hovered
  />
</VectorTileSource>

<div
  class="tooltip"
  style="top: {mouseY}px; left: {mouseX}px;"
  hidden={!hovered}
>
  Name: {hovered?.properties?.name}
  <br />
  Amenity: {hovered?.properties?.type}
</div>

<style>
  .tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    padding: 5px;
    pointer-events: none;
  }
</style>

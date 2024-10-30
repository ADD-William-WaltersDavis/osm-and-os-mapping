<script>
  import {
    VectorTileSource,
    FillLayer,
    CircleLayer,
    LineLayer,
  } from "svelte-maplibre";

  export let TILE_BUCKET;

  let health_polygon = `pmtiles://${TILE_BUCKET}/health_polygon.pmtiles`;
  let health_point = `pmtiles://${TILE_BUCKET}/health_point.pmtiles`;
  let hovered = null;

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = event.clientX + 10;
    mouseY = event.clientY + 10;
  }

  window.addEventListener("mousemove", handleMouseMove);

  let subpurpose_colour_lookup = [
    "hospital",
    "#e0ae26",
    "clinic",
    "#d6d12d",
    "pharmacy",
    "#d6d12d",
    "dentist",
    "#95d62d",
    "doctors",
    "#95d62d",
    "transparent",
  ];
</script>

<VectorTileSource url={health_polygon}>
  <FillLayer
    sourceLayer={"health_polygon"}
    type="fill"
    paint={{
      "fill-color": ["match", ["get", "type"], ...subpurpose_colour_lookup],
      "fill-opacity": 0.6,
    }}
    bind:hovered
  />
  <LineLayer
    sourceLayer={"health_polygon"}
    type="line"
    paint={{
      "line-color": "black",
      "line-width": 2,
    }}
  />
</VectorTileSource>

<VectorTileSource url={health_point}>
  <CircleLayer
    sourceLayer={"health_point"}
    type="circle"
    paint={{
      "circle-radius": 10,
      "circle-color": ["match", ["get", "type"], ...subpurpose_colour_lookup],
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
  <br />
  Healthcare: {hovered?.properties?.healthcare}
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

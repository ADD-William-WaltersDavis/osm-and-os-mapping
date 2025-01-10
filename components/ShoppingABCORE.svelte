<script>
  import { VectorTileSource, CircleLayer } from "svelte-maplibre";

  let point = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/ab_shops.pmtiles`;

  let hovered = null;

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = event.clientX + 10;
    mouseY = event.clientY + 10;
  }

  window.addEventListener("mousemove", handleMouseMove);
</script>

<VectorTileSource url={point}>
  <CircleLayer
    sourceLayer={"abcore_shops"}
    type="circle"
    paint={{
      "circle-radius": 10,
      "circle-color": "cyan",
      "circle-opacity": 0.5,
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
  rm: {hovered?.properties?.rm}
  <br />
  la: {hovered?.properties?.la}
  <br />
  pao: {hovered?.properties?.pao}
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

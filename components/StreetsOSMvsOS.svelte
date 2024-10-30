<script>
  import {
    VectorTileSource,
    LineLayer,
    hoverStateFilter,
  } from "svelte-maplibre";

  let osm_file = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/gradient.pmtiles`;
  let os_file = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/OS_gradient.pmtiles`;
  // let os_2023_roadspeeds_file = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/road_speed_lines.pmtiles`;
  let os_2023_roadspeeds_file = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/os_roadspeeds_restricted_removed.pmtiles`;
  let rsar = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/rsar.pmtiles`;
  let rlar = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/rlar.pmtiles`;
  let original_os = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/osm_vs_os/original_os.pmtiles`;

  let hovered = null;
  $: {
    console.log(hovered);
  }

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = event.clientX + 10;
    mouseY = event.clientY + 10;
  }

  window.addEventListener("mousemove", handleMouseMove);

</script>

<!-- <VectorTileSource url={osm_file}>
  <LineLayer
    sourceLayer={"gradient"}
    type="line"
    paint={{
        "line-width": hoverStateFilter(3, 4),
        "line-opacity": hoverStateFilter(0.5, 1),
        "line-color": "blue",
    }}
    bind:hovered
    manageHoverState
  />
</VectorTileSource> -->

<VectorTileSource url={os_2023_roadspeeds_file}>
  <LineLayer
    sourceLayer={"os_roadspeeds_restricted_removed"}
    type="line"
    paint={{
        "line-width": hoverStateFilter(3, 4),
        "line-opacity": hoverStateFilter(0.5, 1),
        "line-color": "green",
    }}
    bind:hovered
    manageHoverState
  />
</VectorTileSource>

<VectorTileSource url={rsar}>
  <LineLayer
    sourceLayer={"rsar"}
    type="line"
    paint={{
        "line-width": hoverStateFilter(3, 4),
        "line-opacity": hoverStateFilter(0.5, 1),
        "line-color": "cyan",
    }}
    bind:hovered
    manageHoverState
  />
</VectorTileSource>

<VectorTileSource url={rlar}>
  <LineLayer
    sourceLayer={"rlar"}
    type="line"
    paint={{
        "line-width": hoverStateFilter(3, 4),
        "line-opacity": hoverStateFilter(0.5, 1),
        "line-color": "purple",
    }}
    bind:hovered
    manageHoverState
  />
</VectorTileSource>

<!-- <VectorTileSource url={original_os}>
  <LineLayer
    sourceLayer={"original_os"}
    type="line"
    paint={{
        "line-width": hoverStateFilter(3, 4),
        "line-opacity": hoverStateFilter(0.5, 1),
        "line-color": "blue",
    }}
    bind:hovered
    manageHoverState
  />
</VectorTileSource> -->

<!-- <VectorTileSource url={os_file}>
  <LineLayer
    sourceLayer={"gradient"}
    type="line"
    paint={{
        "line-width": hoverStateFilter(3, 4),
        "line-opacity": hoverStateFilter(0.5, 1),
        "line-color": "red",
    }}
    bind:hovered
    manageHoverState
  />
</VectorTileSource> -->

<div
  class="tooltip"
  style="top: {mouseY}px; left: {mouseX}px;"
  hidden={!hovered}
>
  description: {hovered?.properties?.description}
  <br />
  roadclassification: {hovered?.properties?.roadclassification}
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
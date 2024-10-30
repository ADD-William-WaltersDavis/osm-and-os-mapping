<script>
  import {
    VectorTileSource,
    CircleLayer,
  } from "svelte-maplibre";


  let point = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/water_bodies/osm_walk_islands.pmtiles`;
  let ospoint = `pmtiles://https://storage.googleapis.com/very-nice-tiles-bucket/water_bodies/island_nodes_walk.pmtiles`;

</script>

<VectorTileSource url={point}>
  <CircleLayer
    sourceLayer={"osm_walk_islands"}
    type="circle"
    paint={{
      "circle-radius": 10,
      "circle-color": "cyan",
      "circle-opacity": 0.5,
      "circle-stroke-width": 2,
      "circle-stroke-color": "black",
    }}
  />
</VectorTileSource>

<VectorTileSource url={ospoint}>
  <CircleLayer
    sourceLayer={"island_nodes_walk"}
    type="circle"
    paint={{
      "circle-radius": 10,
      "circle-color": "red",
      "circle-opacity": 0.5,
      "circle-stroke-width": 2,
      "circle-stroke-color": "black",
    }}
  />
</VectorTileSource>

<style>
  
</style>

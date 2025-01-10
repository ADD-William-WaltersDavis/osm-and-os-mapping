<script>
  import { VectorTileSource, FillLayer, LineLayer } from "svelte-maplibre";

  export let TILE_BUCKET;

  let polygon = `pmtiles://${TILE_BUCKET}/water_polygon.pmtiles`;
</script>

<VectorTileSource url={polygon}>
  <FillLayer
    sourceLayer={"water_polygon"}
    type="fill"
    paint={{
      "fill-color": "#c22dd6",
      "fill-opacity": 0.01,
    }}
  />
  <LineLayer
    sourceLayer={"water_polygon"}
    type="line"
    paint={{
      "line-color": "black",
      "line-width": 2,
    }}
  />
</VectorTileSource>

<style>
</style>

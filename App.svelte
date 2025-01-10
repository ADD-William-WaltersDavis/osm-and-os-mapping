<script>
  import { MapLibre } from "svelte-maplibre";
  import Settings from "./components/Settings.svelte";
  import HealthLayer from "./components/HealthLayer.svelte";
  import EducationLayer from "./components/EducationLayer.svelte";
  import EntertainmentLayer from "./components/EntertainmentLayer.svelte";
  import ShoppingLayer from "./components/ShoppingLayer.svelte";
  import SustenanceLayer from "./components/SustenanceLayer.svelte";
  import ShoppingAbcore from "./components/ShoppingABCORE.svelte";
  import Water from "./components/Water.svelte";
  import OsmWalkIslands from "./components/OSMWalkIslands.svelte";
  import StreetsOsMvsOs from "./components/StreetsOSMvsOS.svelte";
  import YearlyOsm from "./components/YearlyOSM.svelte";
  import V2EducationTests from "./components/V2EducationTests.svelte";

  // set bucket name here
  const TILE_BUCKET =
    "https://storage.googleapis.com/very-nice-tiles-bucket/osm-destinations";
  // set maptiler key here
  const MAPTILER_KEY = "KhrJl1uDAOHLgJ4c6Px9";

  let purpose;
</script>

<MapLibre
  center={[-1.3, 53.5]}
  zoom={6}
  class="map"
  standardControls
  style={`https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`}
>
  <Settings bind:purpose />
  {#if purpose === "Health"}
    <HealthLayer {TILE_BUCKET} />
  {:else if purpose === "Education"}
    <EducationLayer {TILE_BUCKET} />
  {:else if purpose === "Entertainment"}
    <EntertainmentLayer {TILE_BUCKET} />
  {:else if purpose === "Shopping"}
    <ShoppingLayer {TILE_BUCKET} />
    <SustenanceLayer {TILE_BUCKET} />
    <ShoppingAbcore />
  {:else if purpose === "Sustenance"}
    <SustenanceLayer {TILE_BUCKET} />
  {:else if purpose === "Water"}
    <Water {TILE_BUCKET} />
  {:else if purpose === "Islands"}s
    <OsmWalkIslands />
  {:else if purpose === "Streets"}
    <StreetsOsMvsOs />
  {:else if purpose === "Yearly"}
    <YearlyOsm />
  {:else if purpose === "EducationTests"}
    <V2EducationTests />
  {:else}
    <HealthLayer {TILE_BUCKET} />
    <EducationLayer {TILE_BUCKET} />
    <EntertainmentLayer {TILE_BUCKET} />
    <ShoppingLayer {TILE_BUCKET} />
    <SustenanceLayer {TILE_BUCKET} />
  {/if}
</MapLibre>

<style>
  :global(.map) {
    height: 99vh;
  }
</style>

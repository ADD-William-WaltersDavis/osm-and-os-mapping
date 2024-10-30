<script>
  import colour_mapping from "../data/colour_mapping.json";

  // TODO: temp hacky fix for alpha release, fix this
  function calcNationalNumberPixelGap(number) {
    if (number == 0) {
      return -2;
    } else if (number != 100) {
      return 78;
    } else {
      return 71;
    }
  }
  let nipy_spectral_100 = Object.values(colour_mapping);
</script>

<div>
  <div class="legendtitle">
    <div class="legendtitle-text">Connectivity score:</div>
  </div>
  <div class="legend">
    {#each nipy_spectral_100 as colour}
      <div
        class="national_square"
        style="background-color: {colour}; opacity: {70 / 100};"
      />
    {/each}
  </div>
  <div class="national_numbers">
    {#each [0, 25, 50, 75, 100] as number}
      <div style="margin-left: {calcNationalNumberPixelGap(number)}px">
        {number}
      </div>
    {/each}
  </div>
</div>

<style>
  .legend {
    display: flex;
    border: 1px solid black;
    position: relative;
  }
  .national_square {
    width: 5px;
    height: 32px;
  }

  .national_numbers {
    display: flex;
    height: 10px;
    color: black;
    opacity: 1;
    font-size: 0.8rem;
  }

  .legendtitle {
    font-size: 1rem;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
  }

  .legendtitle-text {
    padding-right: 6px;
    padding-bottom: 2px;
  }
</style>

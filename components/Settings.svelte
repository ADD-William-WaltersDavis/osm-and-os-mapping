<script>
  import LayerToggle from "./LayerToggle.svelte";
  export let purpose;
</script>

<div class="whitebox">
  <LayerToggle bind:purpose />
</div>

<style>
  .whitebox {
    position: absolute;
    top: 5px;
    right: 10px;
    background: rgba(255, 255, 255, 0.7);
    padding: 10px 15px 0 15px;
    border-radius: 10px;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    width: 400px;
  }
</style>

<script>
  export let purpose = "EducationTests";

  function purposes() {
    return [
      "Education",
      "Entertainment",
      "Health",
      "Shopping",
      "Sustenance",
      "Overall",
      "Water",
      "Islands",
      "Streets",
      "Yearly",
      "EducationTests",
    ];
  }
</script>

<div class="govuk-form-group" style="display: flex; margin-bottom: 20px">
  <div
    class="govuk-label"
    style="padding: 5px 10px 0px 0px; font-size: 0.9rem;"
  >
    Purpose:
  </div>
  <select class="govuk-select" bind:value={purpose}>
    {#each purposes() as x}
      <option value={x}>{x}</option>
    {/each}
  </select>
</div>

<style>
  select {
    padding: 4px 8px;
    font-size: 1rem;
    height: 35px;
    border: 1px solid rgb(0, 0, 0);
    height: 30px;
  }
</style>

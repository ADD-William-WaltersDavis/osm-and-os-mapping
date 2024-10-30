# Mapping OSM and OS data sources


You'll need
[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Run
`npm install` once. Use `npm run dev` to work locally. To auto-format code,
`npm run fmt`. To check for warnings, `npm run lint`.

You'll also need to get a maptiler API key. You can get one by signing up at [maptiler.com](https://www.maptiler.com/). Once you have an API key, add it to the App.svelte file.

You'll need to set the bucket storage for the tile layers. We are currently hosting them in a Google Cloud Storage bucket. You can set up your own bucket and add the bucket name to the App.svelte file.
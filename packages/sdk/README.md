# @deckcosttoronto/sdk

Tiny zero-dependency TypeScript client for the
[Deck Cost Toronto API](https://deckcosttoronto.com/developers).

## Install

```bash
npm i @deckcosttoronto/sdk
```

Requires Node 18+ or any modern browser (uses global `fetch`).

## Use

```ts
import { DeckCostClient } from "@deckcosttoronto/sdk";

const client = new DeckCostClient(); // baseUrl defaults to https://deckcosttoronto.com

// Pricing constants
const pricing = await client.getPricing();
console.log(pricing.data.materials.map((m) => m.id));
// [ 'pressure_treated', 'cedar', 'composite', 'pvc' ]

// Cities
const cities = await client.getCities();
const toronto = await client.getCity("toronto");

// Run the calculator server-side
const estimate = await client.estimate({
  lengthFt: 16,
  widthFt: 12,
  material: "composite",
  height: "mid",
  railing: "aluminum",
  hasStairs: true,
  numSteps: 3,
  features: ["lighting"],
  demolishExisting: false,
  includePermit: true,
});
console.log(estimate.data.total); // { low: 16370.8, high: 29086 }
```

## Errors

Non-2xx responses throw `DeckCostApiError`. The error carries `status` and
`body` (the decoded JSON error envelope: `{ version, error, message?,
issues? }`).

```ts
import { DeckCostApiError } from "@deckcosttoronto/sdk";

try {
  await client.estimate(bad);
} catch (err) {
  if (err instanceof DeckCostApiError && err.status === 422) {
    console.error("validation issues:", err.body?.issues);
  }
}
```

## Options

```ts
new DeckCostClient({
  baseUrl: "http://localhost:3210", // override for local dev
  fetch: customFetch,                // override the global fetch
});
```

## License

MIT — see [LICENSE](../../LICENSE) at the repo root. Data returned by the
API is CC BY 4.0; attribute `deckcosttoronto.com`.

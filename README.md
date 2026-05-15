# Deck Cost Toronto API

A small, free, read-only JSON API exposing the GTA deck-pricing data and
calculator that powers [deckcosttoronto.com](https://deckcosttoronto.com).

No keys. No signups. No rate limits worth mentioning. CC BY 4.0 on the data,
MIT on the SDK and examples in this repo.

The on-site developer docs live at
<https://deckcosttoronto.com/developers>. This repo is the machine-readable
surface — OpenAPI spec, a thin TypeScript SDK, runnable examples, and the
changelog.

## Quick start

```bash
# What does a 16 × 12 composite deck with aluminum railing,
# 3-step stair and lighting cost in 2026 GTA dollars?
curl -X POST https://deckcosttoronto.com/api/v1/estimate \
  -H 'content-type: application/json' \
  -d '{
    "lengthFt": 16,
    "widthFt": 12,
    "material": "composite",
    "height": "mid",
    "railing": "aluminum",
    "hasStairs": true,
    "numSteps": 3,
    "features": ["lighting"],
    "demolishExisting": false,
    "includePermit": true
  }'
```

Returns the same total range, per-sq-ft, breakdown, and plain-English
assumptions the on-site UI displays.

## Endpoints

| Method | Path                       | Description                                                                  |
| ------ | -------------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/v1/pricing`          | All pricing constants (materials, heights, railings, features, permit, etc) |
| GET    | `/api/v1/cities`           | List of supported GTA cities                                                 |
| GET    | `/api/v1/cities/{slug}`    | Full record for one city                                                     |
| POST   | `/api/v1/estimate`         | Run the canonical deck-cost calculator                                       |
| GET    | `/api/v1/openapi.json`     | OpenAPI 3.1 spec (machine-readable)                                          |

Base URL: `https://deckcosttoronto.com`. Auth: none. CORS: `*`. Response
envelope: `{ "version": "v1", ...data }`. Caching: `Cache-Control: public,
s-maxage=3600, stale-while-revalidate=86400` on read endpoints; `no-store`
on `/estimate`.

## In this repo

- **`openapi.yaml`** — OpenAPI 3.1 spec. Generate clients with Redocly,
  Stoplight, openapi-typescript, or any OpenAPI-compatible tool.
- **`examples/`** — copy-pasteable usage in curl, Node (fetch), Python
  (requests), and vanilla browser JS.
- **`packages/sdk/`** — `@deckcosttoronto/sdk`, a zero-dependency TypeScript
  client. One class, four methods.
- **`CHANGELOG.md`** — versioning notes.

## Versioning

`v1` is stable. Breaking changes go to `v2` at a new path. Additive changes
(new fields) may land in `v1` without notice — write your client to ignore
unknown keys.

## Licensing

- **Data** returned by the API — [CC BY 4.0](./DATA-LICENSE). Use it
  commercially. Attribute `deckcosttoronto.com`.
- **Code** in this repo (SDK + examples) — [MIT](./LICENSE).

## Issues & contributions

File issues for bugs, schema requests, or to tell us what you're building.
If you ship something interesting on top of the API we may link to it from
[/changelog](https://deckcosttoronto.com/changelog).

Email: hello@deckcosttoronto.com

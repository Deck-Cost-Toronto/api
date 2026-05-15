# Changelog

All notable changes to the Deck Cost Toronto API surface and SDK.

The API follows a path-based versioning scheme. Breaking changes go to a new
`vN` path. Additive changes (new fields, new optional input keys) may land
without notice — write clients to ignore unknown keys.

## [Unreleased]

## [1.0.0] — 2026

### Added
- `GET /api/v1/pricing` — all pricing constants
- `GET /api/v1/cities` — list of supported GTA cities
- `GET /api/v1/cities/{slug}` — full record for a single city
- `POST /api/v1/estimate` — run the canonical deck-cost calculator
- `GET /api/v1/openapi.json` — OpenAPI 3.1 spec
- `@deckcosttoronto/sdk` 0.1.0 — TypeScript client
- Examples: curl, Node, Python, browser

### Pricing & data
- 2026 GTA pricing baseline
- 15 GTA cities with population, region, neighbourhoods, and local notes

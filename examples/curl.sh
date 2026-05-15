#!/usr/bin/env bash
# Deck Cost Toronto API — curl examples.
# All endpoints are public and keyless. No setup required.

set -euo pipefail

BASE=${BASE:-https://deckcosttoronto.com}

echo "=== GET /api/v1/pricing ==="
curl -sS "$BASE/api/v1/pricing" | head -c 400; echo "..."

echo
echo "=== GET /api/v1/cities ==="
curl -sS "$BASE/api/v1/cities" | head -c 400; echo "..."

echo
echo "=== GET /api/v1/cities/toronto ==="
curl -sS "$BASE/api/v1/cities/toronto" | head -c 400; echo "..."

echo
echo "=== POST /api/v1/estimate ==="
curl -sS -X POST "$BASE/api/v1/estimate" \
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
echo

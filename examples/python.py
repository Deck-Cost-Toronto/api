"""Deck Cost Toronto API — Python example.

Requires only the `requests` package (`pip install requests`).
All endpoints are public and keyless. No API key required.

Run: python3 examples/python.py
"""

from __future__ import annotations

import os
import sys

import requests

BASE = os.environ.get("BASE", "https://deckcosttoronto.com")


def main() -> None:
    # 1) Raw pricing constants.
    pricing = requests.get(f"{BASE}/api/v1/pricing", timeout=10).json()
    materials = ", ".join(m["id"] for m in pricing["data"]["materials"])
    print(f"materials: {materials}")

    # 2) Supported GTA cities.
    cities = requests.get(f"{BASE}/api/v1/cities", timeout=10).json()
    print(f"{cities['count']} cities supported")

    # 3) Run a cost estimate.
    payload = {
        "lengthFt": 16,
        "widthFt": 12,
        "material": "composite",
        "height": "mid",
        "railing": "aluminum",
        "hasStairs": True,
        "numSteps": 3,
        "features": ["lighting"],
        "demolishExisting": False,
        "includePermit": True,
    }
    res = requests.post(f"{BASE}/api/v1/estimate", json=payload, timeout=10)
    if not res.ok:
        print(f"estimate failed {res.status_code}: {res.text}", file=sys.stderr)
        sys.exit(1)

    data = res.json()["data"]
    low = f"${data['total']['low']:,.0f}"
    high = f"${data['total']['high']:,.0f}"
    print(f"estimate: {low}–{high} CAD for {data['squareFeet']} sq ft")


if __name__ == "__main__":
    main()

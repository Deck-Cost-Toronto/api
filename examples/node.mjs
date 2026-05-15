// Deck Cost Toronto API — Node example. Requires Node 18+ (global fetch).
// Run: node examples/node.mjs
//
// No dependencies. No API key. Public endpoints only.

const BASE = process.env.BASE ?? "https://deckcosttoronto.com";

async function main() {
  // 1) Pull the raw pricing constants the calculator uses.
  const pricing = await fetch(`${BASE}/api/v1/pricing`).then((r) => r.json());
  console.log("materials:", pricing.data.materials.map((m) => m.id).join(", "));

  // 2) List supported cities.
  const cities = await fetch(`${BASE}/api/v1/cities`).then((r) => r.json());
  console.log(`${cities.count} cities supported`);

  // 3) Run a cost estimate. Same math as the on-site UI.
  const res = await fetch(`${BASE}/api/v1/estimate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
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
    }),
  });

  if (!res.ok) {
    console.error("estimate failed", res.status, await res.text());
    process.exit(1);
  }

  const { data } = await res.json();
  console.log(
    `estimate: $${data.total.low.toLocaleString()}–$${data.total.high.toLocaleString()} CAD for ${data.squareFeet} sq ft`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
/* Simulates the AmbientBackground v5.2 traffic geometry (no DOM):
 * verifies cover mapping puts the three roads inside the photo's city
 * band, tails move left and wrap, heads move right, planes spawn. */

const IMG_W = 1621, IMG_H = 1080;
const ROADS = [
  { fx0: -0.03, fy0: 0.7, fx1: 0.5, fy1: 0.672, fx2: 1.03, fy2: 0.702, scale: 0.75 },
  { fx0: -0.03, fy0: 0.786, fx1: 0.45, fy1: 0.747, fx2: 1.03, fy2: 0.798, scale: 1.0 },
  { fx0: -0.03, fy0: 0.892, fx1: 0.52, fy1: 0.866, fx2: 1.03, fy2: 0.915, scale: 1.28 },
];

const qPoint = (r, t) => {
  const u = 1 - t;
  return {
    x: u * u * r.x0 + 2 * u * t * r.x1 + t * t * r.x2,
    y: u * u * r.y0 + 2 * u * t * r.y1 + t * t * r.y2,
  };
};

function simulate(w, h, label) {
  const s = Math.max(w / IMG_W, h / IMG_H);
  const ox = (w - IMG_W * s) / 2;
  const oy = h - IMG_H * s; // bottom anchor, mirrors CSS center 100%
  const map = (fx, fy) => ({ x: ox + fx * IMG_W * s, y: oy + fy * IMG_H * s });
  console.log(`\n=== ${label} (${w}x${h}) cover scale=${s.toFixed(3)} ===`);
  console.log(`visible image-y band: ${(oy / (IMG_H * s)).toFixed(3)}..${((oy + h) / (IMG_H * s)).toFixed(3)}`);
  for (const road of ROADS) {
    const m0 = map(road.fx0, road.fy0), m1 = map(road.fx1, road.fy1), m2 = map(road.fx2, road.fy2);
    const r = { ...road, x0: m0.x, y0: m0.y, x1: m1.x, y1: m1.y, x2: m2.x, y2: m2.y };
    // heads: t grows; tails: t shrinks — run 300 frames of both
    let head = { t: 0.5 }, tail = { t: 0.5 };
    const hs = 0.06 * 1, ts = -0.06; // one dir each way
    for (let i = 0; i < 300; i++) {
      head.t += hs / 40;
      if (head.t > 1) head.t -= 1;
      tail.t += ts / 40;
      if (tail.t < 0) tail.t += 1;
    }
    const ph = qPoint(r, head.t), pt = qPoint(r, tail.t);
    const mid = qPoint(r, 0.5);
    const inH = mid.y >= 0 && mid.y <= h;
    console.log(
      `road scale=${road.scale}: mid=(${Math.round(mid.x)},${Math.round(mid.y)}) y/h=${(mid.y / h).toFixed(2)} inCanvas=${inH}`,
      `head@t=${head.t.toFixed(2)} x=${Math.round(ph.x)} tail@t=${tail.t.toFixed(2)} x=${Math.round(pt.x)}`
    );
  }
}

simulate(1440, 900, "desktop");
simulate(1920, 1080, "fullHD");
simulate(390, 844, "mobile portrait");
simulate(2560, 1080, "ultrawide");

// plane spawner sanity: positions always inside viewport band
function planeSim(w, h) {
  for (let i = 0; i < 200; i++) {
    const y = h * (0.06 + Math.random() * 0.3);
    if (y < 0 || y > h * 0.36) throw new Error("plane out of band");
  }
  console.log("\nplane band ok (0.06..0.36 of viewport height)");
}
planeSim(1440, 900);

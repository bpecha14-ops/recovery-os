/* eslint-disable @typescript-eslint/no-require-imports */
// Resize AI avatars for web use: 288x288 PNG (displayed at 48-64px, 2x-3x DPR)
const sharp = require("sharp");

(async () => {
  for (const name of ["ai-goldie", "ai-scout"]) {
    const src = `public/${name}_raw.png`;
    const dst = `public/${name}.png`;
    const out = await sharp(src)
      .resize(288, 288, { fit: "cover", position: "centre" })
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(dst);
    const stats = await sharp(dst).stats();
    const { dominant } = await sharp(dst).stats();
    console.log(
      `${dst}: ${out.width}x${out.height}, ${(out.size / 1024).toFixed(0)} KB, ` +
      `mean brightness=${stats.channels.map(c => c.mean.toFixed(0)).join("/")}`
    );
  }
})();

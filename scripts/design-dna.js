/* Extract design DNA from a live site: gradients, colors, fonts, animations. */
const pages = process.argv.slice(2);

const JS = `(() => {
  const out = {};
  const b = getComputedStyle(document.body);
  const html = getComputedStyle(document.documentElement);
  const cs = (el) => getComputedStyle(el);
  out.bodyBg = b.backgroundColor;
  out.bodyBgImage = (b.backgroundImage || '').slice(0, 500);
  out.color = b.color;
  out.fontFamily = b.fontFamily;

  // Collect CSS variables defined on :root
  out.vars = {};
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const r of rules) {
      if (r.selectorText && /:root|html/.test(r.selectorText)) {
        const s = r.style;
        for (let i = 0; i < s.length; i++) {
          const k = s[i];
          if (k.startsWith('--')) out.vars[k] = s.getPropertyValue(k).trim().slice(0, 120);
        }
      }
    }
  }

  // First 40 unique gradient values found across stylesheets
  out.gradients = [];
  const seen = new Set();
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rule) => {
      if (rule.cssRules) { for (const rr of rule.cssRules) walk(rr); return; }
      const bg = rule.style && rule.style.backgroundImage;
      if (bg && bg.includes('gradient') && !seen.has(bg)) {
        seen.add(bg);
        out.gradients.push({ sel: (rule.selectorText||'').slice(0,80), bg: bg.slice(0, 400) });
      }
    };
    for (const r of rules) walk(r);
    if (out.gradients.length > 40) break;
  }

  // Keyframes animation names
  out.keyframes = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const r of rules) if (r.type === CSSRule.KEYFRAMES_RULE) out.keyframes.push(r.name);
  }

  // Hero area: biggest h1 + the section behind it
  const h1 = document.querySelector('h1');
  if (h1) {
    const hs = cs(h1);
    out.h1 = {
      text: h1.textContent.trim().slice(0, 120),
      size: hs.fontSize, weight: hs.fontWeight, color: hs.color,
      bg: (hs.backgroundImage||'').slice(0,300),
      letterSpacing: hs.letterSpacing, lineHeight: hs.lineHeight,
    };
    let sect = h1; 
    for (let i=0;i<6 && sect;i++) { if (sect.scrollHeight > 300 && sect.getBoundingClientRect().height > 200) break; sect = sect.parentElement; }
    if (sect) {
      const ss = cs(sect);
      out.heroSection = {
        tag: sect.tagName + '.' + (sect.className||'').toString().slice(0,80),
        bg: (ss.backgroundImage||'').slice(0,500),
        bgColor: ss.backgroundColor,
      };
    }
  }

  // Background images referenced anywhere in CSS (non-gradient)
  out.bgImages = [];
  const seenIm = new Set();
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rule) => {
      if (rule.cssRules) { for (const rr of rule.cssRules) walk(rr); return; }
      const bg = rule.style && rule.style.backgroundImage;
      if (bg && bg.includes('url(') && !seenIm.has(bg)) {
        seenIm.add(bg);
        out.bgImages.push({ sel: (rule.selectorText||'').slice(0,60), bg: bg.slice(0, 200) });
      }
    };
    for (const r of rules) walk(r);
  }

  // Primary button styling
  const btn = [...document.querySelectorAll('button, a')].find(el => /try|start|free|get/i.test(el.textContent) && cs(el).backgroundColor !== 'rgba(0, 0, 0, 0)');
  if (btn) {
    const s = cs(btn);
    out.primaryBtn = {
      text: btn.textContent.trim().slice(0,40),
      bg: (s.backgroundImage||'').slice(0,200) || s.backgroundColor,
      radius: s.borderRadius, pad: s.padding,
    };
  }

  // Fixed/persistent visual layers (backgrounds of divs covering viewport)
  out.fixedLayers = [...document.querySelectorAll('div,section,video,canvas')].filter(el => {
    const s = cs(el); const p = s.position;
    const r = el.getBoundingClientRect();
    return (p === 'fixed' || p === 'absolute') && r.width >= innerWidth * 0.85 && r.height >= innerHeight * 0.8 && (s.backgroundImage !== 'none' || s.backgroundColor !== 'rgba(0, 0, 0, 0)' || el.tagName === 'VIDEO' || el.tagName === 'CANVAS');
  }).slice(0, 8).map(el => {
    const s = cs(el);
    return {
      tag: el.tagName, cls: (el.className||'').toString().slice(0,80),
      pos: s.position, zIndex: s.zIndex, op: s.opacity,
      bg: (s.backgroundImage||'').slice(0,200), bgColor: s.backgroundColor,
      src: el.src || el.getAttribute('src') || '',
    };
  });
  return JSON.stringify(out);
})()`;

(async () => {
  const { execFileSync } = require("child_process");
  for (const url of pages) {
    console.log("=== " + url + " ===");
    try {
      execFileSync("agent-browser", ["open", url], { stdio: "inherit" });
      execFileSync("agent-browser", ["wait", "--load", "networkidle"], { stdio: "ignore" });
    } catch {}
    execFileSync("agent-browser", ["wait", "2500"], { stdio: "ignore" });
    const raw = execFileSync("agent-browser", ["eval", JS], { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 })
      .replace(/\\"/g, '"').replace(/\\\\/g, "\\").replace(/\\n/g, " ");
    const start = raw.indexOf("{"), end = raw.lastIndexOf("}");
    const parsed = JSON.parse(raw.slice(start, end + 1));
    const keep = {
      bodyBg: parsed.bodyBg, bodyBgImage: parsed.bodyBgImage, color: parsed.color, fontFamily: parsed.fontFamily,
      h1: parsed.h1, heroSection: parsed.heroSection, primaryBtn: parsed.primaryBtn,
      keyframes: parsed.keyframes, fixedLayers: parsed.fixedLayers,
      gradients: (parsed.gradients || []).slice(0, 25), bgImages: (parsed.bgImages || []).slice(0, 10),
      vars: parsed.vars,
    };
    console.log(JSON.stringify(keep, null, 1));
  }
})();

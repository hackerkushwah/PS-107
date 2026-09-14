import { useMemo, type CSSProperties } from "react";

type EffectMode = "dark" | "light";
type FocusRole = "background" | "ui";

type FocusTarget = {
  selector: string;
  role: FocusRole;
  width?: string;
};

export type WovenClothProps = {
  mode?: EffectMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

export const WOVEN_CLOTH_DEFAULTS = {
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const WOVEN_CLOTH_TITLE = "ManakSetu National Quality Silk Tapestry";
const WOVEN_CLOTH_BACKGROUND = "#050914";
const WOVEN_CLOTH_TARGETS: readonly FocusTarget[] = [
  {
    selector: "body > div.fixed.inset-0.overflow-hidden.z-0",
    role: "background",
  },
];

const getBisTapestrySource = (mode: EffectMode) => {
  const isLight = mode === "light";
  const bodyBg = isLight
    ? "radial-gradient(120% 100% at 50% 25%, #ffffff 0%, #f1f5f9 45%, #e2e8f0 100%)"
    : "radial-gradient(120% 100% at 50% 30%, #0c1836 0%, #060c1c 55%, #030610 100%)";
  const glowBg = isLight
    ? "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.14) 0%, rgba(217,119,6,0.07) 50%, transparent 75%)"
    : "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.3) 0%, rgba(217,119,6,0.15) 50%, transparent 75%)";
  const glowOpacity = isLight ? "opacity-[0.45]" : "opacity-[0.20]";
  const vignetteBg = isLight
    ? "radial-gradient(90% 85% at 50% 50%, transparent 65%, rgba(203,213,225,0.35) 100%)"
    : "radial-gradient(90% 85% at 50% 50%, transparent 50%, rgba(3,6,16,0.75) 100%)";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>ManakSetu Silk Tapestry</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body class="overflow-hidden antialiased font-sans" style="background: ${bodyBg}; height: 100dvh; width: 100vw; margin: 0; padding: 0;">

    <!-- Ambient Glow Background -->
    <div class="fixed inset-0 pointer-events-none z-0 bg-cover bg-center ${glowOpacity}" style="background: ${glowBg};"></div>

    <!-- Stage Canvas -->
    <div class="fixed inset-0 overflow-hidden z-0">
        <canvas id="cloth" class="absolute inset-0 w-full h-full block pointer-events-none"></canvas>
        <div class="absolute inset-0 pointer-events-none" style="background: ${vignetteBg};"></div>
    </div>

    <script>
        (() => {
            const isLightMode = ${isLight};
            const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
            const canvas = document.getElementById('cloth');
            if (!window.THREE) return;

            // Generate Haute-Horlogerie / National Standards Silk Tapestry
            function makeClothTexture() {
                const W = 1600, H = 1000;
                const c = document.createElement('canvas'); 
                c.width = W; 
                c.height = H;
                const x = c.getContext('2d');
                
                // 1. Base Silk Gradient: Deep Midnight Royal Navy with subtle emerald-sapphire depth
                const g = x.createLinearGradient(0, 0, W, H);
                g.addColorStop(0.0, '#07122a');
                g.addColorStop(0.3, '#0e234e');
                g.addColorStop(0.6, '#09193b');
                g.addColorStop(1.0, '#040c1e');
                x.fillStyle = g; 
                x.fillRect(0, 0, W, H);

                // 2. Micro Textile Weave Grid
                for(let yy = 0; yy < H; yy += 3.5){
                    x.strokeStyle = 'rgba(255, 255, 255, 0.04)'; 
                    x.lineWidth = 1;
                    x.beginPath(); x.moveTo(0, yy + 0.5); x.lineTo(W, yy + 0.5); x.stroke();
                }
                for(let xx = 0; xx < W; xx += 3.5){
                    x.strokeStyle = 'rgba(96, 165, 250, 0.035)'; 
                    x.lineWidth = 1;
                    x.beginPath(); x.moveTo(xx + 0.5, 0); x.lineTo(xx + 0.5, H); x.stroke();
                }

                // 3. Luxurious Triple Gold Hallmark Border (Fine Filigree)
                const margin = 48;
                // Outer gold wire
                x.strokeStyle = '#d97706';
                x.lineWidth = 6;
                x.strokeRect(margin, margin, W - margin*2, H - margin*2);

                // Guilloche inner wire
                x.strokeStyle = '#f59e0b';
                x.lineWidth = 2;
                x.strokeRect(margin + 14, margin + 14, W - (margin+14)*2, H - (margin+14)*2);

                // Azure safety line
                x.strokeStyle = 'rgba(59, 130, 246, 0.8)';
                x.lineWidth = 1.2;
                x.strokeRect(margin + 24, margin + 24, W - (margin+24)*2, H - (margin+24)*2);

                // Four Corner Ornamental Rosettes
                const corners = [
                    [margin + 24, margin + 24],
                    [W - margin - 24, margin + 24],
                    [margin + 24, H - margin - 24],
                    [W - margin - 24, H - margin - 24]
                ];
                corners.forEach(([cx, cy]) => {
                    x.strokeStyle = '#fbbf24';
                    x.lineWidth = 2.5;
                    x.beginPath(); x.arc(cx, cy, 20, 0, Math.PI * 2); x.stroke();
                    x.fillStyle = '#d97706';
                    x.beginPath(); x.arc(cx, cy, 6, 0, Math.PI * 2); x.fill();
                });

                // 4. Central Geometric Standards Seal / Calibration Ring
                const midX = W / 2;
                const midY = H / 2;

                // Concentric Verification Rings
                x.strokeStyle = 'rgba(217, 119, 6, 0.3)';
                x.lineWidth = 1.2;
                x.beginPath(); x.arc(midX, midY - 20, 280, 0, Math.PI * 2); x.stroke();
                x.strokeStyle = 'rgba(59, 130, 246, 0.25)';
                x.beginPath(); x.arc(midX, midY - 20, 245, 0, Math.PI * 2); x.stroke();
                x.strokeStyle = 'rgba(245, 158, 11, 0.4)';
                x.setLineDash([10, 8]);
                x.beginPath(); x.arc(midX, midY - 20, 200, 0, Math.PI * 2); x.stroke();
                x.setLineDash([]);

                // 5. Elegant Sanskrit BIS Motto & Government Crest
                x.textAlign = 'center'; 
                x.textBaseline = 'middle';

                // Top Sanskrit Seal
                x.fillStyle = '#fbbf24';
                x.font = 'bold 38px "Noto Serif Devanagari", Georgia, serif';
                x.letterSpacing = '4px';
                x.fillText('॥ मानक: पथप्रदर्शक: ॥', midX, midY - 170);

                // Monogram Watermark Seal "IS"
                x.fillStyle = 'rgba(255, 255, 255, 0.09)';
                x.font = '900 210px Georgia, serif';
                x.fillText('IS', midX, midY - 25);

                // Official English Header
                x.fillStyle = '#93c5fd';
                x.font = '600 22px "Segoe UI", Arial, sans-serif';
                x.fillText('B U R E A U   O F   I N D I A N   S T A N D A R D S', midX, midY - 100);

                // Primary Brand Typography
                x.fillStyle = '#ffffff';
                x.font = 'bold 94px "Segoe UI", -apple-system, sans-serif';
                x.fillText('MANAKSETU', midX, midY + 5);

                // Hindi Brand Script
                x.fillStyle = '#f59e0b';
                x.font = '600 38px Georgia, serif';
                x.fillText('( मानकसेतु )', midX, midY + 85);

                // Technical Badge Subtitle
                x.fillStyle = '#60a5fa';
                x.font = '600 19px "Segoe UI", Arial, sans-serif';
                x.fillText('NATIONAL ECOSYSTEM FOR INDIAN STANDARDS & QCO ORDERS', midX, midY + 150);

                // Bottom Ribbon of Technical Modules
                x.fillStyle = '#cbd5e1';
                x.font = 'normal 15px "Segoe UI", Arial, sans-serif';
                x.fillText('Scheme-I (ISI Mark)  •  Compulsory Registration Scheme (CRS)  •  In-House SIT Matrix  •  22,000+ Standards', midX, midY + 195);

                // 6. Fabric Noise & Slub Fiber
                const id = x.getImageData(0, 0, W, H), d = id.data;
                for(let i = 0; i < d.length; i += 4){
                    const n = (Math.random() * 2 - 1) * 7;
                    d[i] += n; d[i+1] += n; d[i+2] += n;
                }
                x.putImageData(id, 0, 0);

                const tex = new THREE.CanvasTexture(c);
                tex.anisotropy = 4;
                return tex;
            }

            // Scene Setup
            const scene = new THREE.Scene();
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            let camera;

            const BW = 4.4, BH = 2.75; 
            const GX = 40, GY = 26;
            const geo = new THREE.PlaneGeometry(BW, BH, GX, GY);
            const mat = new THREE.MeshPhongMaterial({
                map: makeClothTexture(), 
                side: THREE.DoubleSide,
                shininess: 16, 
                specular: 0x3b82f6, 
                color: 0xffffff
            });
            const mesh = new THREE.Mesh(geo, mat); 
            scene.add(mesh);

            // Lighting Setup - adapts for crystal-clear gallery light or deep night glow
            const ambColor = isLightMode ? 0xffffff : 0xdbeafe;
            const ambIntensity = isLightMode ? 0.95 : 0.8;
            scene.add(new THREE.AmbientLight(ambColor, ambIntensity));
            const key = new THREE.DirectionalLight(0xfffbeb, isLightMode ? 1.4 : 1.25); 
            key.position.set(-3, 3.5, 3.2); 
            scene.add(key);
            const rim = new THREE.DirectionalLight(0x3b82f6, isLightMode ? 0.5 : 0.7); 
            rim.position.set(3, -1.5, 2.0); 
            scene.add(rim);

            // Physics Verlet Grid
            const pos = geo.attributes.position;
            const N = (GX + 1) * (GY + 1);
            const cur = new Float32Array(N * 3), prev = new Float32Array(N * 3), rest = new Float32Array(N * 3);
            const pinned = new Uint8Array(N);
            
            for(let i=0; i<N; i++){
                const ax = pos.getX(i), ay = pos.getY(i), az = 0;
                cur[i*3] = prev[i*3] = rest[i*3] = ax;
                cur[i*3+1] = prev[i*3+1] = rest[i*3+1] = ay;
                cur[i*3+2] = prev[i*3+2] = rest[i*3+2] = az;
            }
            
            // Pin the top edge
            for(let ix=0; ix<=GX; ix++){ pinned[ix] = 1; }
            const idx = (ix, iy) => ix + iy * (GX + 1);

            const restH = BW / GX, restV = BH / GY;
            const GRAV = -2.5, DAMP = 0.986, DT = 0.016;

            function wind(ix, iy, t) {
                const cx = ix / GX, cy = iy / GY;
                const travel = t * 1.5 - cy * 3.6;
                const gust = 0.5 + 0.35 * Math.sin(t * 0.5) + 0.15 * Math.sin(t * 1.7 + 1.2);
                const amp = 3.6 * cy;
                const fz = (Math.sin(travel + cx * 3.0) + 0.4 * Math.sin(travel * 1.5 + cx * 5.4)) * amp * gust;
                const fx = Math.sin(t * 0.8 + cy * 2.0) * 0.5 * cy;
                const fy = -0.3 * cy;
                return [fx, fy, fz];
            }

            function step(t) {
                for(let iy=0; iy<=GY; iy++){
                    for(let ix=0; ix<=GX; ix++){
                        const i = idx(ix, iy);
                        if(pinned[i]) continue;
                        const [fx, fy, fz] = wind(ix, iy, t);
                        for(let k=0; k<3; k++){
                            const j = i * 3 + k;
                            const a = (k===0 ? fx : k===1 ? (fy+GRAV) : fz);
                            const v = (cur[j] - prev[j]) * DAMP;
                            prev[j] = cur[j];
                            cur[j] = cur[j] + v + a * DT * DT;
                        }
                    }
                }
                
                for(let it=0; it<3; it++){
                    for(let iy=0; iy<=GY; iy++){
                        for(let ix=0; ix<GX; ix++){ solve(idx(ix,iy), idx(ix+1,iy), restH); }
                    }
                    for(let iy=0; iy<GY; iy++){
                        for(let ix=0; ix<=GX; ix++){ solve(idx(ix,iy), idx(ix,iy+1), restV); }
                    }
                }
                
                for(let ix=0; ix<=GX; ix++){
                    const i = ix;
                    cur[i*3] = rest[i*3]; cur[i*3+1] = rest[i*3+1]; cur[i*3+2] = rest[i*3+2];
                    prev[i*3] = rest[i*3]; prev[i*3+1] = rest[i*3+1]; prev[i*3+2] = rest[i*3+2];
                }
            }

            function solve(a, b, rl) {
                const ax = cur[a*3], ay = cur[a*3+1], az = cur[a*3+2];
                const bx = cur[b*3], by = cur[b*3+1], bz = cur[b*3+2];
                let dx = bx - ax, dy = by - ay, dz = bz - az;
                const d = Math.sqrt(dx*dx + dy*dy + dz*dz) || 1e-6;
                const diff = (d - rl) / d * 0.5;
                dx *= diff; dy *= diff; dz *= diff;
                
                const pa = pinned[a], pb = pinned[b];
                if(!pa && !pb){ 
                    cur[a*3]+=dx; cur[a*3+1]+=dy; cur[a*3+2]+=dz; 
                    cur[b*3]-=dx; cur[b*3+1]-=dy; cur[b*3+2]-=dz; 
                }
                else if(pa && !pb){ cur[b*3]-=dx*2; cur[b*3+1]-=dy*2; cur[b*3+2]-=dz*2; }
                else if(!pa && pb){ cur[a*3]+=dx*2; cur[a*3+1]+=dy*2; cur[a*3+2]+=dz*2; }
            }

            function commit() {
                for(let i=0; i<N; i++){ pos.setXYZ(i, cur[i*3], cur[i*3+1], cur[i*3+2]); }
                pos.needsUpdate = true;
                geo.computeVertexNormals();
            }

            function fit() {
                const w = window.innerWidth, h = window.innerHeight;
                renderer.setSize(w, h, false);
                const aspect = w / h;
                camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
                const vFit = (BH/2) / Math.tan(40 * Math.PI / 360);
                const hFit = (BW/2) / Math.tan(40 * Math.PI / 360) / aspect;
                // Positioned so the ENTIRE cloth is centered and 100% visible
                camera.position.set(0, 0, Math.max(vFit, hFit) * 1.05 + 0.15);
                camera.lookAt(0, 0, 0);
            }
            
            window.addEventListener('resize', fit); 
            fit();

            let running = false, raf = 0, t = 0;
            function loop() {
                if(!running) return;
                t += DT; 
                step(t); 
                commit();
                renderer.render(scene, camera);
                raf = requestAnimationFrame(loop);
            }
            
            function start() { if(running)return; running=true; raf=requestAnimationFrame(loop); }
            function stop() { running=false; cancelAnimationFrame(raf); }

            if(reduce) {
                for(let s=0; s<220; s++) step(s*DT);
                commit(); 
                renderer.render(scene, camera);
            } else {
                for(let s=0; s<40; s++) step(s*DT);
                t = 40 * DT;
                start();
                document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
            }
        })();
    </script>
</body>
</html>`;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function buildFocusedDocument(mode: EffectMode) {
  const targetJson = JSON.stringify(WOVEN_CLOTH_TARGETS).replace(/</g, "\\u003c");
  const background = mode === "light" ? "#f8fafc" : "#050914";
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
</style>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return getBisTapestrySource(mode)
    .replace(/<\/head>/i, `${focusStyle}</head>`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export function WovenCloth({
  mode = "dark",
  hue = WOVEN_CLOTH_DEFAULTS.hue,
  saturation = WOVEN_CLOTH_DEFAULTS.saturation,
  brightness = WOVEN_CLOTH_DEFAULTS.brightness,
  className,
  style,
}: WovenClothProps) {
  const safeMode: EffectMode = mode === "light" ? "light" : "dark";
  const source = useMemo(() => buildFocusedDocument(safeMode), [safeMode]);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={safeMode}
      title={WOVEN_CLOTH_TITLE}
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: safeMode === "light" ? "#f8fafc" : "#050914",
        filter,
        ...style,
      }}
    />
  );
}

export default WovenCloth;

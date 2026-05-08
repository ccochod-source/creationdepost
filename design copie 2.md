# DESIGN SYSTEM — Visual Identity Document

---

## 01. AESTHETIC DIRECTION

**Concept:** *Neo-Classical Maximalism meets Digital Playground*

A design language that collides the weight of antiquity with the electric energy of contemporary digital culture. Think: marble bas-relief animated by neon lightning bolts. Serious craft. Unserious attitude.

**Tone:** Editorial precision + mythological drama + cartoon irreverence

**The one unforgettable thing:** Every surface feels alive — as if carved from stone one moment, then glowing with comic-book voltage the next.

---

## 02. BACKGROUND — Dynamic Surfaces

> Source: Image 1 (Agence Loon — dot-grid, high-contrast cards)

### Base Canvas
- **Background color:** `#F0EDE8` — warm off-white, like aged parchment or uncoated stock
- **Texture:** Fine dot-grid pattern, evenly spaced (~24px), soft pink/rose dots at low opacity (`rgba(220, 80, 100, 0.18)`)
- The grid gives structure without rigidity — it breathes

### Card System
Cards are the primary building blocks. Two variants:

| Variant | Background | Border | Shadow |
|--------|-----------|--------|--------|
| **Dark** | `#0D0D0D` | none | none |
| **Light** | `#FFFFFF` | `2px solid #0D0D0D` | none |

- No border-radius — cards are **strictly rectangular**, hard-edged
- Cards stack, overlap, and break the grid intentionally
- Use `outline: 2px solid #0D0D0D` over `border` for pixel-perfect edges

### Dynamic Layout Principles
- **Asymmetric grid:** 2-column right side with 4 cards, large type left — unequal weight
- Statistics bar: full-width horizontal band, divided by `1px` vertical rules
- Elements bleed into each other — no excessive gutters
- Use `position: relative` overflow with deliberate clipping for drama

### Accent Color
- **Signal Pink/Red:** `#E8174A` — used sparingly for live indicators, hover states, key CTAs
- Never gradient, always flat

---

## 03. TYPOGRAPHY — Editorial Serif System

> Source: Image 2 (Newsletter — large serif body text, red italic accent)

### Philosophy
Typography **is** the design. Not a supporting element — the primary visual. Set text large enough that it becomes texture.

### Type Scale

```
Display / Hero:      80–120px   Black / ExtraBold   uppercase or title case
Section Header:      48–64px    Bold                mixed case
Body Large:          28–36px    Regular             reading weight, generous leading
Body:                17–19px    Regular             line-height: 1.65
Caption / Label:     11–13px    Medium / Bold       tracked uppercase, letter-spacing: 0.12em
CTA / Button:        13–15px    Bold                ALL CAPS, letter-spacing: 0.15em
```

### Font Families

**Display (Primary):** A high-contrast editorial serif — think Freight Display, Playfair Display, or Canela  
→ Used for all headlines, pull quotes, large numerals  
→ Characteristics: dramatic stroke contrast, elegant descenders, strong personality

**Body (Secondary):** A geometric sans — clean, neutral, utilitarian  
→ Used for descriptive text, labels, UI elements  
→ Characteristics: monolinear, clear at small sizes

**Accent (Italic Serif):** The same serif family in italic — used for emotional emphasis  
→ Render in `#E8174A` (signal red) for the "kicker" phrase  
→ Example: *"Pour comprendre, pas pour scroller."*

### Rules
- **Never** center-align body text
- Headings can be left-aligned or dramatically oversized d bleeding off-canvas
- Mix serif headline + sans body in every composition
- Large numerals (`20+`, `100%`) use the display serif — numbers as sculpture
- Red italic = maximum 1 phrase per section — it's a signature, not a style

---

## 04. EFFECTS — Sculptural Depth

> Source: Image 3 (Greco-Roman bas-relief — white marble, silver metallic highlights)

### Effect Language
The core visual tension: **matte white** (receding, structural) vs. **polished silver/chrome** (active, foregrounded).

This translates digitally into a depth system:

### Layering Model

```
Layer 0 — Background canvas       (dot-grid texture, warm off-white)
Layer 1 — Structural elements     (flat white or black cards, no shadows)
Layer 2 — Highlighted element     (metallic sheen, elevated, "selected")
Layer 3 — Foreground accents      (high-contrast icons, bold type, CTAs)
```

### CSS Effect Recipes

**Matte White / Marble (Layer 1):**
```css
background: #F5F4F0;
filter: drop-shadow(0 1px 0 rgba(255,255,255,0.9));
opacity: 0.6; /* recedes into background */
```

**Metallic Silver Highlight (Layer 2):**
```css
background: linear-gradient(135deg, #C8C8C8 0%, #E8E8E8 40%, #9A9A9A 60%, #D0D0D0 100%);
box-shadow: 
  inset 0 1px 0 rgba(255,255,255,0.6),
  0 8px 32px rgba(0,0,0,0.22),
  0 2px 8px rgba(0,0,0,0.15);
```

**Bas-Relief Text Effect:**
```css
text-shadow: 
  1px 1px 0 rgba(255,255,255,0.9),
  -1px -1px 0 rgba(0,0,0,0.12);
color: #E8E5DF;
```

**Depth Focus — Active State:**
When an element is "selected" or hovered, it shifts from matte to metallic:
```css
transition: filter 0.4s ease, box-shadow 0.4s ease;
filter: brightness(1) contrast(1.1);
box-shadow: 0 20px 60px rgba(0,0,0,0.3);
```

### Motion — Sculptural Reveal
Elements don't fade in — they **emerge**, like being carved out of stone:
```css
@keyframes emerge {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
    filter: blur(4px) brightness(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0) brightness(1);
  }
}
```
- Staggered delays across sibling elements: `0ms`, `80ms`, `160ms`, `240ms`
- Duration: `600ms` with `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 05. FANTASY — Cartoon Energy

> Source: Image 4 (The Producer Sacha — hot pink, lightning bolts, illustrated avatars, colliding shapes)

### Energy System
Fantasy elements inject **pure id** into the otherwise structured layout. They are: unruly, kinetic, dimensional, fun.

### Color Injection
Fantasy palette lives *on top of* the base system — never replaces it:

| Name | Hex | Use |
|------|-----|-----|
| Electric Pink | `#FF4DD8` | Background splashes, CTA hover fills |
| Hot Magenta | `#D400B8` | Active states, collision zones |
| Neon Lime | `#BEFF4E` | Accent avatars, badge borders |
| Pure White | `#FFFFFF` | Lightning bolt fills, knock-outs |

### Signature Shape: The Lightning Bolt
- Rendered as SVG, used as background dividers, decorative scattering
- Sizes: `16px`, `32px`, `64px`, `120px` mixed freely
- Opacity: `0.4` for background instances, `1.0` for featured instances
- Can rotate at `15°`, `45°`, `72°` increments
- On hover, bolts `scale(1.15)` with a `0.15s ease` transition

### Avatar System
Illustrated round avatars with thick colored outlines:
- Border radius: `50%` — always circular
- Border: `4–6px solid` in accent color (lime, pink, or white)
- Drop shadow: `0 4px 20px rgba(0,0,0,0.25)`
- Can overflow their containing box — let avatars break layout edges
- On hover: slight `rotate(3deg)` + `scale(1.05)`

### Collision Composition
Fantasy layouts use **diagonal bisection** — large angled shapes splitting the canvas:
```css
clip-path: polygon(0 0, 100% 0, 100% 70%, 60% 100%, 0 100%);
/* or via SVG diagonal rules */
```
- Two shapes can intersect, creating a darker overlap zone
- Text placed over the intersection, knocked out in white

### Typography in Fantasy Mode
- Font style switches to **bold condensed / italicized** — loud, leaning forward
- All caps only
- Letter spacing slightly **negative**: `letter-spacing: -0.02em`
- Text can overlap images, avatars, and shapes — the stack is intentional

---

## 06. INTERACTION PRINCIPLES

### Hover States
- Cards: `outline` shifts from `#0D0D0D` to `#E8174A` — instant, no transition
- Avatars: `rotate(3deg) scale(1.05)` over `200ms ease`
- Buttons (dark): background flips to `#E8174A`, text stays white
- Buttons (outline): border + text flip to `#E8174A`

### Scroll Behavior
- Hero elements: `emerge` animation on first viewport entry
- Stats bar: numbers count up from 0 via JS on scroll-into-view
- Metallic/highlighted elements parallax at `0.85x` scroll speed vs. background

### Cursor
On interactive elements: custom cursor or `cursor: crosshair` — never default pointer on cards

---

## 07. COMPONENT SUMMARY

```
┌─────────────────────────────────────────────┐
│  COMPONENT          LAYER      EFFECT        │
├─────────────────────────────────────────────┤
│  Hero headline      3          Emerge anim   │
│  Dark service card  1–2        Metallic hover│
│  Stats bar          1          Count-up JS   │
│  CTA button         3          Red fill flip │
│  Lightning bolts    Fantasy    Scatter, scale│
│  Avatars            Fantasy    Rotate hover  │
│  Diagonal banner    Fantasy    Clip-path     │
│  Red italic kicker  Typography Static red    │
│  Dot-grid canvas    0          Static        │
└─────────────────────────────────────────────┘
```

---

## 08. DO / DON'T

| ✅ DO | ❌ DON'T |
|-------|---------|
| Hard rectangular cards | Rounded corners (ever) |
| Serif display + sans body | Mono-font layouts |
| Metallic gradient for focus | Drop shadows everywhere |
| Dot-grid background | Plain white backgrounds |
| Diagonal / asymmetric layouts | Centered, symmetric grids |
| Red italic for one kicker phrase | Red used freely |
| Avatars breaking layout bounds | Avatars contained in boxes |
| Lightning bolts as decoration | Stars, circles, blobs |
| Count-up stats | Static number displays |
| `emerge` stagger animations | Simultaneous fade-ins |

---

*Design system synthesized from: Agence Loon (structure), Newsletter editorial (typography), Greco-Roman bas-relief (effects), The Producer Sacha (fantasy energy).*

# DESIGN.md

Design source of truth for building calm, premium, block-based websites and product pages.

Keep the existing identity: colors, typography, and the signature animated pill button.
Change the page structure: use precise rectangular blocks, strong editorial rhythm, and clean scroll-based animation.

Reference mood:

- Ashley Brooke Creative Studio: bold editorial pacing, large typography, repeated numbered panels, moving image strips, confident scroll reveals.
- Aura Life captures: soft warm palette, gold details, calm spirituality, bordered rectangular service blocks.
- Elixir Studio capture: one strong black rectangular feature block with metrics and a direct CTA.
- Kimbrand capture: oversized testimonial title, split reviews, precise vertical divider, editorial spacing.

---

# 1. Core Direction

## Mood

The site should feel calm, premium, clear, and intentionally structured.

The new format must not feel like a generic startup template. It should feel like a creative studio page with disciplined layout: big blocks, clear sections, large text, precise borders, and smooth motion.

## Non-Negotiables

- Keep the current color palette.
- Keep the current typography direction.
- Keep the signature animated pill button for primary actions.
- Replace rounded-card layouts with rectangular block layouts.
- Use visible structure: borders, columns, section dividers, numbered panels, grids, and editorial spacing.
- Build sections as blocks, not floating cards.
- Use animation as page rhythm, not decoration.

## Overall Feeling

- Calm but confident.
- Premium but not shiny.
- Editorial but usable.
- Structured but not rigid.
- Animated but never noisy.
- Spacious with precise alignment.

## Avoid

- Generic centered hero sections.
- Purple or pink AI gradients.
- Floating orb decorations.
- Random glassmorphism.
- Rounded card grids.
- Decorative shapes with no purpose.
- Startup dashboard fake visuals.
- Overly soft layouts where nothing has a clear boundary.

---

# 2. Color Palette & Roles

Use semantic color names. Never use raw hex values directly inside components unless defining tokens.

## Core Colors

| Name | Hex | Role |
|---|---:|---|
| ink | #121816 | Main text, dark UI, premium backgrounds |
| soft-ink | #26302C | Secondary dark text, dark borders |
| paper | #FFFFFF | Main page background |
| shell | #F7F4EA | Warm light background, calm sections |
| mist | #EEF3ED | Soft green-tinted background |
| sand | #E8DFCC | Subtle dividers, quiet surfaces |
| muted | #6F756E | Secondary text |
| muted-light | #A7ADA3 | Captions, disabled states |
| gold | #B9A15F | Premium accent, small highlights, tags |
| olive | #667348 | Main action accent, button fill, calm success |
| vivid-blue | #246BFE | Bright accent for key SaaS moments |
| fresh-green | #2FA86B | Hover sweep, confirmation, active states |
| coral | #F07C5A | Occasional warm highlight, never dominant |
| danger | #B93A32 | Error states only |

## Color Usage

- Default page background: paper or shell.
- Section background rhythm: paper, shell, mist, then one dark ink section.
- Borders: sand on light sections, soft-ink on dark sections.
- Text: ink on light, paper on dark.
- Gold: small labels, thin dividers, icons, numbers, eyebrow text.
- Olive and fresh-green: actions and motion accents.
- Vivid-blue: only for product/data/link moments, never as the main brand color.
- Coral: one-off warm emphasis, not a section theme.

## Dark Blocks

Dark blocks should feel like editorial anchors:

- background: ink
- text: paper
- muted text: muted-light
- accent: gold or olive
- border: soft-ink
- no glow, no glossy effect

---

# 3. Typography

The typography stays: clean uppercase sans-serif with elegant italic serif accents.

## Font Families

heading:
Neue Montreal, Satoshi, Inter Tight, Helvetica Neue, sans-serif

body:
Inter, Satoshi, Neue Montreal, system-ui, sans-serif

editorial-accent:
Cormorant Garamond Italic, Playfair Display Italic, Libre Baskerville Italic, Georgia Italic, serif

mono:
Geist Mono, IBM Plex Mono, Courier New, monospace

## Type Personality

- Use large sans-serif headings as the main visual force.
- Use italic serif only for short accent words or quotes.
- Use uppercase labels with generous letter spacing.
- Use large numbers for panel indexing and metrics.
- Keep body text readable and calm.
- Avoid long centered paragraphs.

## Type Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|---|---:|---:|---:|---:|---|
| mega | 112px | 600-700 | 0.9 | 0 | Hero titles, section openers |
| display | 88px | 500-700 | 0.95 | 0 | Big editorial moments |
| display-accent | 88px | 400 italic | 0.95 | 0 | Short serif accent inside display titles |
| h1 | 64px | 600-700 | 1.0 | 0 | Page titles |
| h2 | 44px | 600 | 1.08 | 0 | Section titles |
| h3 | 28px | 600 | 1.18 | 0 | Block titles |
| body-lg | 20px | 400 | 1.55 | 0 | Intro copy |
| body | 16px | 400 | 1.6 | 0 | Main UI and content |
| small | 14px | 400 | 1.5 | 0 | Secondary UI text |
| label | 12px | 700 | 1.0 | 0.14em | Uppercase labels |

## Mobile Type

- mega: 48px to 58px
- display: 42px to 52px
- h1: 40px to 48px
- h2: 30px to 36px
- Long headings must wrap cleanly and never overflow.

---

# 4. Page Format

The site is built from precise rectangular blocks.

## Page Frame

desktop:
max_width: 1440px
outer_margin: 32px to 56px
section_gap: 0px to 24px
grid: 12 columns
gutter: 24px

tablet:
outer_margin: 24px
grid: 6 columns
gutter: 20px

mobile:
outer_margin: 16px to 20px
grid: 1 column
gutter: 16px

## Block Rules

- Blocks are rectangular.
- Default block radius: 0px.
- Optional softened radius: 4px to 8px maximum.
- Use borders, not heavy rounding, to create definition.
- Use section dividers and vertical lines.
- Align edges precisely across sections.
- Use large inner padding: 48px to 96px desktop, 24px to 32px mobile.
- A block can be light, dark, image-led, metric-led, or text-led.
- Do not put cards inside cards.

## Preferred Block Types

hero_block:
large title, short copy, signature CTA, image strip or editorial visual

split_block:
two columns, one image or metric panel, one text panel

service_grid:
rectangular 2x2 or 3x2 bordered blocks with number, icon, title, text, CTA

statement_block:
full-width text panel with oversized headline and one action

metric_block:
dark rectangular band with 3 to 5 numbers and labels

testimonial_block:
large heading, split review layout, author row, vertical separators

process_block:
numbered panels stacked or in a horizontal grid

footer_block:
rectangular dark or shell panel with links, contact, and CTA

---

# 5. Section System

## Hero

The hero must feel like an editorial opening, not a generic landing page.

Recommended structure:

- Top navigation with short links.
- Large headline occupying most of the first viewport.
- One italic serif accent word or phrase.
- Short copy, maximum 2 lines on desktop.
- Signature pill CTA.
- One rectangular image strip, grid, or product/studio visual.
- Bottom edge should hint at the next section.

Hero layout options:

- 60/40 split: text left, image block right.
- Big title top, image strip below.
- Dark rectangular feature block with light text.
- Editorial panel with numbered side rail.

Hero motion:

- nav fades down first
- title reveals line by line with mask
- CTA slides up after title
- image block reveals with clip-path from bottom or side

Avoid:

- centered text-only hero
- abstract gradient backgrounds
- tiny CTA lost under large copy

## About / Story

Use a strong split layout:

- Left: large image or portrait block.
- Right: label, thin divider, large heading, paragraph, quote, tags.
- Keep the image rectangular with no radius.
- Use gold lines and small labels for structure.
- Let the quote sit as a bordered text rail, not a decorative quote bubble.

## Services

Use precise blocks, inspired by the Aura Life capture.

Layout:

- 2x2 grid on desktop.
- 1 column on mobile.
- Each service is a large bordered rectangle.
- Number or icon sits at the top.
- Title and short paragraph sit in the lower half.
- CTA is a small gold/olive text link or secondary button.

Service block rules:

- background: paper or shell
- border: 1px solid sand
- radius: 0px to 6px
- min_height: 360px desktop
- hover: subtle lift, border darkens, number slides slightly
- no rounded card styling

## Metrics / Proof

Use a single dark rectangular block inspired by the Elixir Studio capture.

Layout:

- background: ink
- text: paper
- large heading left
- CTA right
- metrics in one row below
- each metric has a large number and uppercase label
- no separate cards inside

Motion:

- block clips in from bottom
- numbers count up only once when visible
- CTA arrow rotates on hover

## Testimonials / Avis

Use the Kimbrand-style testimonial structure.

Layout:

- Big title: "Avis", "Ils en parlent", or "In their words".
- Two large review columns on desktop.
- Thin vertical divider between reviews.
- Author row under each review with image, name, and role.
- Optional handwritten/signature-style name only if the brand needs it.
- On mobile, stack reviews with horizontal dividers.

Review typography:

- Main review text should be large: 28px to 42px desktop.
- Secondary review text can be 20px to 28px.
- Use body font for readability.
- Use editorial-accent only for author signatures or short quoted emphasis.

Avis block rules:

- background: paper or shell
- radius: 0px
- border-top: 1px solid sand
- border-bottom: 1px solid sand
- strong whitespace
- no review cards
- no star-rating clutter unless required

## Work / Cases

Use a grid of rectangular case blocks.

- Large image block.
- Short title.
- Category label.
- One-line result.
- Hover reveals a text layer or shifts the image slightly.
- Use rows with varied block widths, but keep edges aligned.

## Final CTA

Use a strong statement block.

- Big headline.
- Short copy.
- Signature button.
- Optional contact line.
- Background can be ink, shell, or mist.
- Keep the block rectangular.

---

# 6. Buttons

The signature button style is mandatory for primary actions.

Primary CTAs must use the Uiverse-inspired pill button structure: rounded full, white or warm light base, animated color sweep, soft shadow, and a circular arrow icon that rotates on hover.

Buttons are the exception to the rectangular rule. Keep them pill-shaped.

## Signature Button Behavior

button:
shape: pill, border-radius 999px
base: light surface
border: 2px solid shell or sand
shadow: soft elevated shadow
padding: 10px 18px
display: inline-flex
gap: 8px
overflow: hidden
animation: before layer expands from left to full width
hover_text: paper
icon: circular bordered arrow
icon_motion: rotate from 45deg to 90deg on hover
transition: 500ms to 700ms, smooth custom easing

## Signature Button Colors

primary:
base: shell
sweep: olive or fresh-green
text: ink
hover_text: paper
icon_border: soft-ink
icon_background_hover: paper

blue_variant:
base: paper
sweep: vivid-blue
text: ink
hover_text: paper

gold_variant:
base: shell
sweep: gold
text: ink
hover_text: ink

## Required Tailwind Pattern

Use this pattern for main CTAs, adapting colors to the semantic palette:

```html
<button
  type="button"
  class="group relative z-10 isolate mx-auto flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-sand bg-shell px-4 py-2 text-lg text-ink shadow-xl backdrop-blur-md transition-colors duration-700 before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-olive before:transition-all before:duration-700 hover:text-paper before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700"
>
  Explore
  <svg
    class="h-8 w-8 rotate-45 rounded-full border border-soft-ink p-2 text-paper transition duration-300 ease-linear group-hover:rotate-90 group-hover:border-none group-hover:bg-paper"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      class="fill-ink"
    ></path>
  </svg>
</button>
```

## Secondary Actions

secondary:
pill or simple text link
base: transparent or paper
border: 1px solid sand
hover: mist or shell
icon: optional arrow

text_link:
uppercase small label
gold or ink
thin underline
arrow moves 4px on hover

---

# 7. Components & Surfaces

## Blocks Instead Of Cards

Use blocks as the default component.

block:
background: paper, shell, mist, or ink
border: 1px solid sand
radius: 0px to 6px
padding: 32px to 80px
shadow: optional, very soft
hover: border shift, image motion, text reveal, or subtle translate

## Block Rules

- Rectangle first.
- Border and spacing define the component.
- Use shadow only when the block needs elevation.
- Never make every item a rounded card.
- Do not stack a card inside another card.
- Repeated blocks must align to the same grid.

## Images

image_block:
shape: rectangle
radius: 0px to 6px maximum
object_fit: cover
motion: subtle parallax, clip reveal, or scale from 1 to 1.04 on hover

Image rules:

- Use real images when possible.
- Crop with intention.
- Avoid dark, blurry, stock-like imagery.
- Do not over-round portrait or work images.

## Tags

tags:
border: 1px solid sand or gold
radius: 0px to 4px
uppercase or small label
background: transparent or shell
hover: subtle fill

Tags should look like labels, not pills, unless used inside the button system.

## Inputs

input:
background: paper
border: 1px solid sand
radius: 4px to 8px
padding: 14px 16px
focus: olive or vivid-blue outline
placeholder: muted-light

---

# 8. Navigation

Navigation should be simple and editorial.

desktop:
position: sticky or static
height: 72px to 96px
background: paper or shell
border-bottom: 1px solid sand
links: short uppercase labels
logo: text-based or simple mark
cta: signature button or clean text link

mobile:
logo left
menu icon right
menu opens as full rectangular panel
links stacked with large text

Rules:

- Avoid tiny crowded nav.
- Use short labels.
- Keep the nav aligned to the same page frame as sections.
- Menu panels should be rectangular, not round modals.

---

# 9. Motion & Animation

Motion is part of the identity. It should feel like a crafted studio site: smooth reveals, scrolling rhythm, and tactile hover states.

## Inspiration From Ashley Brooke CS

Use these patterns:

- Line-by-line text reveals.
- Numbered sections that pin the viewer's attention.
- Image strips that move gently with scroll.
- Repeated panel transitions.
- Large typography entering through masks.
- CTA labels and arrows moving with confidence.
- Content blocks that reveal through clip-path instead of simple opacity.

## Motion Timing

fast:
150ms to 220ms for UI feedback

medium:
300ms to 500ms for hover states and menus

slow:
700ms to 1000ms for hero reveals and section transitions

easing:
cubic-bezier(0.22, 1, 0.36, 1)

## Scroll Reveals

section_reveal:
initial: translateY(40px), clip-path inset(0 0 100% 0)
visible: translateY(0), clip-path inset(0 0 0 0)
duration: 800ms
stagger: 80ms to 140ms

text_reveal:
split by line or word
mask overflow hidden
translateY(110%) to 0
duration: 700ms

image_reveal:
clip-path inset(12% 0 0 0) to inset(0)
scale: 1.04 to 1
duration: 900ms

## Hover Motion

service_block_hover:
translateY(-4px)
border-color: gold or olive
number: translateX(8px)
image: scale(1.03)

testimonial_hover:
divider darkens slightly
author image scale 1.03

case_hover:
image scale 1.04
text layer reveals from bottom
arrow moves right

button_hover:
keep existing sweep animation and arrow rotation

## Animation Don'ts

- No scroll-jacking.
- No chaotic motion.
- No constant floating elements.
- No animation that slows down basic reading.
- No generic fade-only page when clip or mask reveal fits.
- Respect reduced-motion preferences.

---

# 10. Responsive Behavior

## Breakpoints

mobile:
0px to 767px
1 column
16px to 20px margins
display headings: 42px to 58px
reduced motion

tablet:
768px to 1024px
2 to 6 columns
24px margins
simpler asymmetry

desktop:
1025px and above
12 columns
32px to 56px margins
full block system

## Mobile Rules

- Stack blocks vertically.
- Keep rectangular structure visible.
- Reduce hero height so the next section is hinted.
- Avoid text overflow at all costs.
- Keep tap targets at least 44px by 44px.
- Replace 2-column testimonials with stacked testimonials.
- Reduce parallax and heavy animation.

---

# 11. Copywriting

Tone should be calm, direct, and premium.

## Voice

- Short sentences.
- Clear fast.
- Confident without shouting.
- Warm but not fluffy.
- Concrete, not generic.

## Good Copy

- Build with clarity.
- Make the work visible.
- Move with intention.
- Less noise. More structure.
- A calmer way to grow.
- Designed to be understood.

## Avoid

- "Revolutionize your workflow."
- "Unlock limitless potential."
- "AI-powered synergy."
- Any sentence that could fit 10,000 startup sites.

---

# 12. Implementation Prompts

Use these prompts when asking an AI agent to build with this direction.

## Full Page Prompt

"Build a calm premium website using DESIGN.md. Keep the existing colors, typography, and signature animated pill CTA button. Structure the page with precise rectangular blocks, sharp editorial spacing, large typography, thin dividers, dark metric bands, 2x2 service blocks, and a Kimbrand-style testimonial section. Add Ashley Brooke CS-inspired motion: line reveals, clip-path block reveals, subtle image scroll movement, and confident hover states. Avoid rounded card grids, purple gradients, generic startup layouts, and decorative blobs."

## Hero Prompt

"Create an editorial hero with a large sans-serif headline, one italic serif accent phrase, short copy, the signature animated pill CTA, and a rectangular image or visual block. Reveal the title line by line and the image through a clip-path mask. The next section should be visible at the bottom of the first viewport."

## Services Prompt

"Create a 2x2 service grid using large bordered rectangular blocks. Each block has a number or icon, title, short text, and small action link. Radius must stay between 0px and 6px. Use shell, paper, sand borders, gold details, and subtle hover movement."

## Avis Prompt

"Create a testimonial section inspired by Kimbrand: a very large heading, two editorial review columns, a thin vertical divider, author rows with small rectangular or circular portraits, and generous whitespace. Do not use review cards. Stack reviews on mobile with horizontal dividers."

## Motion Prompt

"Add smooth premium motion inspired by Ashley Brooke CS: staggered line reveals, clip-path block reveals, subtle image parallax, numbered panel transitions, and polished hover states. Keep motion useful, slow enough to feel premium, and never disruptive."

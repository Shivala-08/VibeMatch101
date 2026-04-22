# Design System Document: The Electric Nocturne

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Electric Nocturne."** 

This system is designed to evoke the high-energy, sophisticated atmosphere of an exclusive late-night campus lounge. We are moving away from the "standard app" aesthetic of rigid grids and flat surfaces. Instead, we embrace a **High-End Editorial** approach. We achieve this through intentional asymmetry, fluid depth, and a high-contrast typography scale that feels more like a fashion magazine than a utility tool. This design system treats the interface as a living, breathing environment where light and shadow are tactile.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in a deep, near-black foundation, allowing our primary and secondary tones to vibrate with energy.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. 
Structure must be achieved through:
- **Tonal Shifts:** Placing a `surface_container_low` section against a `surface` background.
- **Glassmorphism:** Using `surface_variant` at reduced opacity with a 20px backdrop blur to create "islands" of content.
- **Negative Space:** Using generous padding to allow content to breathe and define its own boundaries.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use the Material surface tokens to define proximity to the user:
- **`surface_container_lowest` (#0d0d1a):** The deep foundation. Used for the main background of the app.
- **`surface_container_low` (#1a1a28):** Used for large secondary sections or footer areas.
- **`surface_container_high` (#292937):** The default "card" level.
- **`surface_container_highest` (#343342):** Used for elements that need to pop, such as active states or floating menus.

### The "Glass & Gradient" Rule
To achieve the "mesmerizing" vibe, all primary cards must utilize glassmorphism. Use the `surface_variant` token at 40-60% opacity with a `backdrop-filter: blur(20px)`. 
**Signature Texture:** Main Call-to-Actions (CTAs) should not be flat. Use a linear gradient transitioning from `primary` (#ffb0cc) to `primary_container` (#ff46a0) at a 135-degree angle to provide "soul" and professional polish.

---

## 3. Typography
Our typography is a study in "Sophisticated Contrast." We pair a traditional, high-contrast serif with a modern, clean sans-serif.

- **Display & Headlines (Noto Serif):** These are our "Editorial" moments. Use `display_lg` through `headline_sm` to convey authority and elegance. These should often be used with slightly tighter letter-spacing to feel like a premium masthead.
- **Body & Labels (Plus Jakarta Sans):** Our utility workhorse. `body_lg` and `body_md` provide maximum readability against dark backgrounds. 
- **The Hierarchy Strategy:** Use `primary` colored text sparingly for `label_md` or `title_sm` to highlight key metadata (e.g., "3 miles away" or "New Match"), creating a "neon sign" effect against the dark background.

---

## 4. Elevation & Depth
In this design system, depth is felt, not seen through harsh shadows.

### The Layering Principle
Hierarchy is achieved by "stacking" the surface tiers. A `surface_container_highest` element sitting on a `surface_container_low` background creates a natural lift. This mimics fine paper or frosted glass stacked in a physical space.

### Ambient Glows (Shadow Replacement)
Avoid traditional grey or black shadows. When an element needs to "float":
- **Glow Color:** Use `rgba(233, 30, 140, 0.3)` for primary elements.
- **Diffusion:** Use large blur values (20px to 40px) with low opacity (4%-8% for neutral elements, 20% for interactive glows). 
- **Direction:** Glows should be centered (0px X and Y offset) to mimic a backlight rather than a top-down light source.

### The "Ghost Border" Fallback
If accessibility requires a container edge, use a **Ghost Border**: Use the `outline_variant` token at 15% opacity. This provides a "suggestion" of an edge without breaking the fluid, glass-like aesthetic.

---

## 5. Components

### Buttons
- **Primary:** Gradient background (`primary` to `primary_container`). Border-radius: `full`.
- **Interaction:** On hover, scale to 105% and trigger a `primary` glow effect.
- **Tertiary:** No background. Use `primary` colored text with a `label_md` font weight.

### Cards & Lists
- **Rule:** Forbid the use of divider lines.
- **Structure:** Separate list items using `surface_container_low` backgrounds for even rows and `surface_container_lowest` for odd rows, or simply use vertical white space (from the `xl` spacing scale).
- **Glass Cards:** Cards must feature a `surface_variant` glass effect with a subtle `outline_variant` ghost border (10% opacity) for high-end definition.

### Match & Discovery Cards (Context Specific)
- **Visuals:** Edge-to-edge imagery.
- **Overlay:** A 40% height bottom-to-top gradient (from `surface_container_lowest` at 100% opacity to transparent).
- **Typography:** The user’s name should be in `headline_lg` (Noto Serif) sitting directly on the gradient.

### Input Fields
- **Style:** Minimalist under-line style using the `outline` token or a subtle glass container (`surface_container_low`).
- **Focus State:** The underline or container border transitions to `primary` with a subtle glow. Label floats upward and shrinks to `label_sm`.

### Chips
- **Selection:** Use `secondary_container` with `on_secondary_container` text.
- **Shape:** Always use `roundedness.full` to maintain the "fluid" and "energetic" vibe.

---

## 6. Do's and Don'ts

### Do:
- **Do** use intentional asymmetry. Place a headline on the left and a supporting body paragraph slightly offset to the right.
- **Do** use "Breathing Room." Dark mode feels cramped easily; increase your white space by 20% compared to a light-mode design.
- **Do** use `tertiary` (#69df54) for "Success" or "Online" states to provide a sharp, energetic contrast to the pink/purple theme.

### Don't:
- **Don't** use 100% white (#FFFFFF) for body text. Use `on_surface` (#e3e0f4) to reduce eye strain and maintain the premium tonal balance.
- **Don't** use standard Material shadows. If it doesn't glow or layer, it doesn't belong.
- **Don't** use hard corners. Every interactive element must use at least the `md` (1.5rem) roundedness scale.
- **Don't** ever use a solid 1px divider line. If you feel you need one, use more space instead.

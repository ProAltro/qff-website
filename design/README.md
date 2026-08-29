# Design prototypes

This directory is deliberately separate from the application. Keep early design
exploration here as `.pen` files and image/PDF exports; do not turn a prototype
into application code until its direction has been approved.

## Tools configured for this workspace

- **Figma MCP** is declared in the root `.mcp.json`. Restart Codex, authenticate
  with Figma when prompted, then use it to create or edit frames on the Figma
  canvas.
- **pen.dev (Pencil) CLI** is installed as the local `pen` command. It creates
  editable `.pen` canvas files and can export review images without touching
  the app.

## First prototype

Authenticate once, then make a prototype and a review image:

```bash
pen login
pen --out design/qff-home-v1.pen --prompt "Create three distinct desktop and mobile landing-page directions for QFF. Use real placeholder content, clear visual hierarchy, an original typographic direction, and no generic AI gradients. Keep the concepts as editable design frames, not application code."
pen --in design/qff-home-v1.pen --export design/qff-home-v1.png --export-scale 2
```

Open the `.pen` file in the pen.dev desktop app or VS Code/Cursor extension to
edit it visually. Keep each approved direction as a separate versioned `.pen`
file, for example `qff-home-v2-editorial.pen`.

## Review loop

1. Create 2–3 visual directions in a `.pen` file.
2. Export PNGs and select one direction.
3. Iterate on typography, layout, accessibility, and mobile framing in the
   design file.
4. Only then provide the selected Figma frame or `.pen` artifact for
   implementation.

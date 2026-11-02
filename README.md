# FORM & FIELD

A portfolio concept for an adaptive-reuse architecture studio.

A fully responsive, multi-page static frontend portfolio. Original speculative brand, UX, architectural illustrations and writing, developed from a custom V4 design.

> **Disclosure:** This is a self-initiated studio concept. The architecture projects are fictional design exercises, not actual commissioned or constructed buildings. Diagrams are illustrative and not engineering or construction documents.

## Pages
- `index.html`: hero, flagship case study, illustrated projects, filterable archive, material studies.
- `projects/commons.html`: detailed civic depot reuse project.
- `projects/patchwork.html`: conceptual education adaptive reuse project.
- `projects/tide-yard.html`: conceptual waterfront renewal project.
- `studio.html`: practice principles and design narrative.
- `notes.html`: keyboard-accessible illustrated material tabs.
- `contact.html`: locally generated project-brief form with download and clipboard actions.

## Run locally
No installation, account, backend, or build pipeline required.

```bash
python3 -m http.server 4173
```

Open http://localhost:4173. All assets are local.

## Deploy
- **Netlify:** select this folder as the publish directory (`.`) or connect the GitHub repository. No build command.
- **Vercel:** import the GitHub repository, choose Framework Preset **Other**, and deploy. No build command.

## Interactions
- Responsive mobile navigation (Escape/click-away support)
- Project archive filters with live result counts
- Independent shareable project pages
- Keyboard-accessible field-note tabs
- Scroll progress indicator
- Validated project-brief form with local copy/download
- `prefers-reduced-motion` support and semantic markup

## Limitations
The enquiry form **does not send** messages, store data, or integrate a real email service. It only generates a brief in the visitor's browser. The brand, project facts and diagrams are all speculative placeholders that must not be represented as a real architecture firm's built work.

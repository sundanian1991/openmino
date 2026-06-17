# Architecture

**Best for:** system overviews, data-flow diagrams, integration maps, infra topology.

## Sub-variants

### Tiered Architecture (default)
- Group components by tier (frontend → backend → data) or trust boundary (public → private).
- See main conventions below.

### Hub-and-Spoke Architecture
- Central platform/hub node with peripheral systems radiating out.
- Hub is the focal element. Spokes use muted arrows; hub uses accent.

### Data Flow Architecture
- Arrows carry data-type labels (JSON, SQL, events). Focus is on the data, not the components.
- Component boxes are minimal (name only); arrows are the primary visual element.

## Layout conventions
- Group components by tier or trust boundary (frontend → backend → data; public → private).
- Primary flow runs left→right or top→down. Pick one and hold it.
- Draw arrows before boxes so z-order puts connections behind components.
- 1–2 coral focal nodes: the primary integration point, the primary data store, or the key decision node.
- Dashed boundary rectangles mark regions (VPC, security group, trust zone); labels sit on a paper-colored mask over the boundary line.

## Anti-patterns
- Every box in coral ("this is important too") — hierarchy collapses.
- Bidirectional arrow when one direction is obvious from context.
- Legend floating inside the diagram area.

## Examples
- `assets/example-architecture.html` — minimal light
- `assets/example-architecture-dark.html` — minimal dark
- `assets/example-architecture-full.html` — full editorial

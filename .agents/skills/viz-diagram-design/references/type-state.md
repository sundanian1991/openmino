# State Machine

**Best for:** finite state logic — order status, auth state, connection lifecycle, form wizard, job queue status.

## Sub-variants

### Linear State Chain (default)
- States arranged in a single line (left→right or top→down). See main conventions below.

### Hub & Spoke
- Central state (e.g., "Active") with transitions radiating to peripheral states (error, paused, archived).
- The hub is the focal element; spokes are secondary.

### Swimlane State Machine
- States grouped by responsibility (e.g., "User actions" vs "System actions"). Dashed boundary rectangles mark regions.
- Useful when different actors trigger different transitions.

## Layout conventions
- States are rounded rectangles (`rx=8`), labeled in Geist.
- **Start**: filled ink dot (`r=6`). **End**: ringed dot (outer `r=8` outline, inner filled `r=5`).
- Transitions: curved arrows labeled in Geist Mono as `event [guard] / action` (omit sections you don't need).
- Self-loops curve above the state.
- Orient along the dominant flow direction (left→right or top→down); rearrange before crossing transitions.
- Coral on the state the reader should notice — typically the error state, or "happy completion".

## Anti-patterns
- More transitions than states × 2 → likely two state machines.
- "From any state" transitions drawn from every state — use a single annotation (`* → Error on timeout`) instead.
- Unlabeled transitions (the whole point is *what triggers this*).

## Examples
- `assets/example-state.html` — minimal light
- `assets/example-state-dark.html` — minimal dark
- `assets/example-state-full.html` — full editorial

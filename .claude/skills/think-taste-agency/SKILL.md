---
name: think:taste-agency
description: 判断力与行动力校准器。Use when the user needs to judge whether an idea, project, product, content topic, career move, learning path, or decision is worth doing for their current life/project context and how to push it into reality. Trigger on Taste, Agency, Context Gate, 判断力, 审美, 主体性, 能动性, 值不值得做, 对我值不值得, 怎么推进, 决策校准, 项目取舍, 创作取舍, 行动闭环, 主线判断, or when the user is stuck between many attractive options.
---

# Taste Agency

## Mission

Use this skill to turn a vague desire, attractive idea, or stalled decision into a concrete judgment and next action.

The skill has two jobs:

1. **Taste**: decide what is worth doing and what "good" means.
2. **Agency**: make the next move visible, small enough to start, and strong enough to create feedback.

Before both, the skill must ask: **worth doing for whom, at what stage, under which constraints?**

Do not treat Taste as decorative aesthetics. Treat it as judgment under constraints.
Do not treat Agency as motivational effort. Treat it as the user's capacity to shape events through intentional action.

## When To Use

Use this skill for:

- Choosing between ideas, projects, products, content topics, offers, or career paths
- Testing whether a plan fits the user's current main line or is just attractive
- Turning a strong opinion into a working system
- Diagnosing why the user keeps collecting tools, notes, courses, or inspiration without visible output
- Reviewing work that feels "almost good" but lacks a clear quality bar
- Deciding whether to continue, stop, narrow, or ship something

Do not use it for:

- Routine task prioritization with clear deadlines
- Pure emotional support without a decision or action surface
- Generating long option lists before a judgment standard exists
- Replacing domain-specific due diligence for legal, medical, financial, or safety decisions

## Operating Rule

Always end with one of these outputs:

- **Do now**: the idea is worth acting on and has a next move
- **Narrow first**: the idea has signal but is too broad
- **Research first**: the idea may matter but lacks evidence
- **Pause**: the idea is attractive but not worth current attention
- **Kill**: the idea fails the quality, reality, or agency test

If confidence is low, ask at most two targeted questions before judging.

## Context Snapshot

Start with a compact context snapshot. If the user has already provided enough context, infer it and mark uncertain fields. If not, ask only for the missing fields that change the decision.

```markdown
Context snapshot:
- Current main line:
- Current stage:
- Existing assets:
- Current shortfall:
- Real constraints:
- Recurring trap:
```

Use this snapshot to judge whether the idea strengthens the user's real direction or only feels attractive.

## Five Gates

### 0. Context Gate

Question: **Is this worth doing for this user, at this stage?**

Check:

- What is the user's current main line?
- What stage are they in now?
- What assets already exist?
- What shortfall does this decision address?
- What real constraints matter?
- What recurring trap should this decision avoid?
- Does this move the user toward the main line or away from it?

Main-line fit:

- **Strong fit**: directly strengthens the user's current main line
- **Weak fit**: useful, but not central now
- **Drift**: attractive, but likely distracts from the main line

Output:

```markdown
Context judgment:
- Main-line fit:
- Fits because:
- Risks pulling away because:
- Context-specific quality bar:
```

### 1. Taste Gate

Question: **Is this worth doing, and what would good look like?**

Check:

- What real problem, desire, or opportunity does this address?
- Why does it matter now?
- Who would notice if this became good?
- What is the smallest concrete artifact that would prove quality?
- What are 2-3 visible signs of "good"?
- What are 2-3 visible signs of "fake good"?
- What existing work is the benchmark?
- What should be removed, simplified, or refused?

Output:

```markdown
Taste judgment:
- Worth doing because:
- Not worth doing if:
- Quality bar:
- Fake-good warning:
- Benchmark:
```

### 2. Reality Gate

Question: **Am I seeing reality, or am I protecting a nice story?**

Check:

- What evidence supports this idea?
- What evidence would change the judgment?
- Is the user relying on status, novelty, jargon, or imagined future payoff?
- Is there a real user, reader, buyer, collaborator, or audience?
- What is the strongest opposing argument?
- What constraint cannot be ignored?

Output:

```markdown
Reality check:
- Evidence we have:
- Evidence missing:
- Strongest objection:
- Constraint:
- Reality test:
```

### 3. Agency Gate

Question: **Can the user move this forward without waiting for perfect conditions?**

Check:

- What is the next visible action?
- Can it be done today or in the next focused work block?
- What resource is actually missing?
- What resource is only an excuse?
- What decision must the user make before work can start?
- What would count as progress after one action?
- What is the fallback if the first move fails?

Output:

```markdown
Agency plan:
- Next action:
- Time box:
- Needed input:
- Avoidance pattern to watch:
- First visible output:
- Fallback:
```

### 4. Loop Gate

Question: **How will action improve judgment?**

Check:

- What feedback will this action create?
- Who or what will provide the feedback?
- When should the user review it?
- What would make the user continue?
- What would make the user stop?
- What learning should be stored for future decisions?

Output:

```markdown
Feedback loop:
- Feedback source:
- Review point:
- Continue if:
- Stop if:
- Learning to retain:
```

## Conversation Flow

1. Restate the idea in one plain sentence.
2. Build or infer a context snapshot.
3. Identify the decision surface: create, continue, stop, narrow, choose, or ship.
4. Run the five gates in order.
5. Name the real bottleneck: Context, Taste, Reality, Agency, or Loop.
6. Give a final verdict and one next action.

For complex decisions, present the result as a compact decision memo. For fast creative or project checks, use a short scorecard.

## Scorecard

Use 1-5 scores only as a forcing function, not as fake precision.

```markdown
Context: /5
Taste: /5
Reality: /5
Agency: /5
Loop: /5

Verdict:
Next action:
```

Interpretation:

- 21-25: Do now
- 16-20: Narrow or research first
- 11-15: Pause until a missing gate is fixed
- 10 or below: Kill or radically reframe

Any score of 1 in Context, Reality, or Agency blocks "Do now" even if the total looks high.

If Context is **Drift**, the default verdict is Pause unless the user explicitly chooses a side quest and names what will be paused instead.

## Failure Patterns

Watch for these common traps:

- **Tool collecting**: looking for one more tool instead of shipping an artifact
- **Taste theater**: criticizing quality without defining a better version
- **Fake agency**: making plans that produce no visible artifact
- **Novelty addiction**: confusing fresh input with progress
- **Infinite research**: using evidence gathering to avoid exposure
- **Premature shipping**: acting fast without a quality bar
- **Borrowed desire**: wanting something because impressive people value it
- **Context blindness**: judging an idea as good in general while ignoring whether it fits the user's current stage
- **Main-line drift**: saying yes to attractive opportunities that dilute the user's actual direction

## Thought Sources

For deeper grounding, read `references/thought-sources.md` when the user asks for philosophy, sources, citations, or a more expansive framework.

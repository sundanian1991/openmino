---
title: "Loop engineering: the 14-step roadmap from prompter to loop designer. "
author: "孙大年"
date: "2026-06-15"
---



&nbsp;

Loop engineering: the 14-step roadmap from prompter to loop designer. 

Most developers still prompt their coding agents by hand. They type, they wait, they read the diff, they type again. 9out of 10 builders have never written a single loop that prompts the agent for them.

No automation, no state file, no verifier, no schedule. The leverage point has moved - from typing prompts to designing systems that prompt. This is the 14-step roadmap from prompter to loop designer.

> Follow my Linkedin to get fresh AI alpha: 
>
> [linkedin.com/in/lev-deviatkin](https://linkedin.com/in/lev-deviatkin)

This is the 14-step roadmap to make that shift - sourced from Anthropic’s engineering docs, Addy Osmani’s long-form on loop engineering, and recent measurement studies. 

Three tiers: figure out if you actually need a loop, learn the five building blocks, then build the smallest one that works without hurting you.

14 steps. 3 tiers. Stop prompting. Start designing.

![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fec1c40065dd30a1b549ed2de2de98f48?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=USM3hKep%2B9iKXBopXpHhPSJ4Nu4%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

  


PART 1 · The Why & The Test

## 01. Loop engineering is replacing yourself as the prompter.

For two years, the way you got something out of a coding agent was: write a prompt, share the context, read what came back, write the next prompt. The agent was a tool and you held it the entire time. That part is ending.

Loop engineering is building a small system that finds the work, hands it to the agent, checks the result, records what happened, and decides the next move - on its own. You design that system once. The system prompts the agent from then on.

Addy Osmani breaks it into six parts:

![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151033%2Fgetnotes_img_1a8bd91800229100SQjQhls5.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=93XkJxO4yNWQ0ST3ESvSfcGR108%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

Anthropic engineers now merge eight times as much code per day as they did in 2024 - a figure Anthropic itself calls “almost certainly an overstatement of the true productivity gain.” 

The number is debated. The mechanism isn’t: the leverage point moved from typing prompts to designing the loop that prompts.

  


## 02. Run the 4-condition test before you build anything.

Loops earn their cost under four conditions. Miss one and the loop costs more than it returns. The honest take from AlphaSignal’s analysis, and the part most X-threads skip:

The four conditions in plain English:

- The task repeats. A loop amortizes its setup across many runs. For a one-time job, a good prompt is faster and cheaper. If the work does not recur weekly, you don’t have a loop - you have a script you ran once.
- Verification is automated. The loop needs something that can fail the work without you in the room. A test suite, a type checker, a linter, a build. No automated check means you’re back in the chair reading every diff - the exact job the loop was supposed to remove.
- Your token budget can absorb the waste. Loops re-read context, retry, explore. That burns tokens whether or not the run ships anything. The technique scales with budget, which is why it reads as obvious to people with effectively free tokens and reckless to people on a metered plan.
- The agent has a senior engineer’s tools. Logs, a reproduction environment, the ability to run the code it writes and see what breaks. Without that, the loop iterates blind.

![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151033%2Fgetnotes_img_1a8bd92440029100WPMWGsIG.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=x3f3o%2Bb%2FcUMItvBG%2Bch7X8vvA9Y%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

  


## 03. Who wins, who loses. Loops favor whoever can spend.

The economics are not universal. The people calling loop engineering obvious tend to have unmetered tokens. 

The people for whom it’s reckless are usually on a $20 consumer plan trying to run heavy verification loops without hitting limits or a surprise invoice.

Who actually benefits, in practice:

- Teams with repetitive, machine-checkable work and the budget to run it - continuous test triage, dependency bumps, lint-and-fix passes, issue-to-PR drafts on a codebase with strong test coverage.
- Codebases with strong existing test suites. If a junior engineer could do the task from a checklist and a test suite would catch their mistakes, a loop fits.
- Async-first teams with multi-agent patterns already in use. For these teams, routines are the missing orchestration layer.

Who should skip it, today:

- Solo builders on consumer plans - the token bill arrives before the productivity gain does.
- Anyone working on code with no automated verification. A loop with no real check is the agent agreeing with itself on repeat.
- Teams whose real constraint is review capacity rather than typing speed. A loop generates more code; if review was already the bottleneck, it just makes the queue longer.

For one-off tasks, exploratory work, or anything where “done” is a judgment call, a single well-aimed prompt still wins. The honest version of this article is: loop engineering is real, and most developers don’t need it yet.

  


## 04. The 30-second loop check.

The 4-condition test from step 2 is the strategic decision. This is the tactical one - the checklist you run on a specific task before you turn it into a loop. 

Miss one box and keep it as a manual prompt.

- 1. The task happens at least weekly. Less than weekly → setup cost will never amortize.
- 2. A test, type check, build, or linter can reject bad output. No automated gate → the agent grades its own homework.
- 3. The agent can run the code it changes. No reproduction environment → iteration is blind.
- 4. The loop has a hard stop. Token budget, iteration count, or time limit. Without one, the loop runs until someone notices the bill.
- 5. A human reviews before merge, deploy, or dependency changes. Anything irreversible needs a human approval gate before action.
- 
  ![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151034%2Fgetnotes_img_1a8bd92d8054e1584aEc2Lt3.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=RBsUcvowo1cWNm9OYHBzvi3%2F9Mk%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

Good first loops:

- CI failure triage - nightly, scan failures, classify causes, draft fix PRs for the easy ones.
- Dependency bump PRs - weekly, scan for updates, test compatibility, open PRs.
- Lint-and-fix passes - on every PR open event, apply style fixes automatically.
- Flaky test reproduction - loop until a theory survives the test.
- Issue-to-PR drafts on code with strong tests, where bad output gets rejected by the suite.

Bad first loops - these need a human in the chair:

- Architecture rewrites
- Auth or payments code
- Production deploys
- Vague product work
- Anything where “done” is a judgment call

  


PART  2 · The 5 Building Blocks

## 05. Automations: the heartbeat.

Automations are what make a loop an actual loop and not just one run you did once. They fire on a schedule, on an event, or on a trigger condition. They’re the heartbeat - everything else in the loop hangs off them.

What this looks like in the two tools that matter:

- Codex. The Automations tab - pick a project, set a prompt, set a cadence, choose local checkout or background worktree. Runs that find something land in a Triage inbox; runs that find nothing archive themselves.
- Claude Code. Three primitives that compose into the same shape:  
  
/loop for session-scoped cadence, Desktop scheduled tasks for restart-survival, Routines for laptop-off cloud runs. Pair with hooks for lifecycle events.

Two primitives inside an automation that separate working loops from expensive ones:

- /loop re-runs on a cadence. Use it when you want regular checks regardless of state.
- /goal keeps going until a condition you wrote is actually true. A separate small model checks completion, so the agent that wrote the code isn’t the one grading it. 
- 
  ![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151034%2Fgetnotes_img_1a8bd9320024e1586F2XQesY.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=2mLzaGI4VjAtp0%2B9080HvM3eZ8s%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

This is the maker-vs-checker split applied to the stop condition itself.

python

```python
> /loop 30m /goal All tests in test/auth pass and lint is clean.
  Scan src/auth for new failures, propose fixes in claude/auth-fixes,
  open draft PR when goal condition holds.

▲ Claude
  CronCreate(*/30 * * * * : auth quality loop)
  Stop condition: tests pass + lint clean (verified by checker)
✓ Scheduled. Will continue past intermediate completions
  until /goal condition is met by independent checker.
```

  


## 06. Worktrees: parallel without chaos.

The second you run more than one agent, the files start colliding. Two agents writing the same file is the same headache as two engineers committing to the same lines without talking first. 

A git worktree fixes it - a separate working directory on its own branch sharing the same repo history, so one agent’s edits literally cannot touch the other’s checkout.

[https://x.com/i/status/2064374643729773029](https://x.com/i/status/2064374643729773029)

How it shows up in both tools:

- Codex builds worktree support in - several threads hit the same repo at once without bumping into each other.
- Claude Code exposes git worktree directly, a --worktree flag to open a session in its own checkout, and an isolation: worktree setting on subagents so each helper gets a fresh checkout that cleans itself up after.

Worktrees take away the mechanical collision, but you are still the ceiling. Your review bandwidth decides how many parallel agents you can actually run - not the tool.

  


## 07. Skills: write project knowledge once. Read on every run.

A Skill is how you stop re-explaining the same project context every session like a goldfish. Both tools use the same format: a folder with a SKILL.md inside, holding instructions and metadata, plus optional scripts, references, and assets.

Why this matters specifically for loops: a loop without skills re-derives your whole project context from zero every cycle. With skills, intent compounds. 

The conventions, build steps, “we don’t do it like this because of that one incident” - written once on the outside, read by every run.

python

```python
name: ci-triage
description: Classify CI failures by root cause (env, flake, real bug,
  dependency, infra), draft fixes for the easy ones, escalate the rest.
  Trigger whenever a workflow run fails or on the morning triage loop.
---

# CI triage skill

## Classification rules
- env: missing secret, wrong env var, infra not provisioned. # human
- flake: passes on retry without code change. # retry once, then file
- bug: deterministic failure tied to recent commit. # draft fix
- dependency: failure tied to a version bump. # draft rollback
- infra: timeout, OOM, runner issue. # escalate

## Fix patterns
- Auth tests → check src/auth/middleware first
- Database tests → verify migration applied in CI env
- E2E tests → check selectors against the latest UI snapshot

## Never do
- Disable failing tests — always file as escalation instead
- Modify CI config without human approval
- Touch src/payments/ or src/billing/ (in claude/permissions.md)

## State
Update STATE.md after each run: file paths checked, classifications,
PRs opened, items escalated.
```

  


## 08. Connectors: the loop touches your real tools. Via MCP.

A loop that can only see the filesystem is a tiny loop. Connectors, built on the Model Context Protocol (MCP), let the agent read your issue tracker, query a database, hit a staging API, drop a message in Slack. 

Codex and Claude Code both speak MCP, so the connector you wrote for one usually just works in the other.

This is the difference between an agent that says “here is the fix” and a loop that opens the PR, links the Linear ticket, and pings the channel once CI is green. 

The connectors are the reason the loop can act inside your actual environment, not just tell you what it would do if it could.

The connectors that pay back fastest for loop work, in order:

- GitHub - read repos, create branches, open PRs, comment on issues, react to webhook events. The single biggest day-one win for any code loop.
- Linear or Jira - update tickets as the loop progresses, link PRs back to issues, close items automatically when verification passes.
- Slack - post triage results, ping humans on escalations, summarize overnight runs in the morning.
- Sentry / your error tracker - let the loop investigate live alerts and draft fixes for the high-frequency ones.

  


![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151035%2Fgetnotes_img_1a8bd93c8004e158E8Hn47f9.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=vNFRGdt6QeQeumh%2FMQieqhaaAsE%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

## 09. Sub-agents: keep the maker away from the checker. 

The most useful structural thing in a loop, by far, is splitting the agent that writes from the agent that checks.   
  
Osmani’s framing is exact: the model that wrote the code is “way too nice grading its own homework.” A second agent with different instructions and sometimes a different model catches the stuff the first one talked itself into.

This is the evaluator-optimizer pattern from Anthropic’s December 2024 engineering post under a new name. One model generates, another critiques, repeat. The vocabulary going viral in 2026 was documented eighteen months ago.

How sub-agents land in both tools:

- Codex only spawns subagents when you ask, runs them at the same time, then folds results back into one answer. You define your own agents as TOML files in .codex/agents/ - name, description, instructions, optional model and reasoning effort.   
  
Your security reviewer can be a strong model on high effort while your explorer is some fast read-only thing.
- Claude Code does the same with subagents in .claude/agents/ and agent teams that pass work between them.   
  
The usual split: one agent explores, one implements, one verifies against the spec.

The reason it matters specifically inside a loop: the loop runs while you are not watching, so a verifier you actually trust is the only reason you can walk away.   
  
Sub-agents burn more tokens since each one does its own model and tool work  - spend them where a second opinion is worth paying for.

![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151035%2Fgetnotes_img_1a8bd93ec0902a387KAozJYy.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=Q3v8H%2BGC5QlcQjlj2tyE8Lv7DDc%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

  


PART 3 · Build It Right or Don’t Build It

## 10. The state file. The agent forgets. The file does not.

This is the piece that sounds too dumb to matter and is actually the spine of every working loop. A markdown file, a Linear board, a JSON state -anything that lives outside the single conversation and holds what’s done and what is next.

Why this matters: agents have short memory by default. What they learn this session is gone tomorrow unless you write it down. 

Osmani’s rule: the agent forgets, the repo does not. A loop without persistent state restarts every run; a loop with state resumes.

json

```json
# Loop state · ci-triage

## Last run
2026-06-09 03:30 UTC · 7 failures classified, 3 fixes drafted, 4 escalated

## In progress
- claude/fix-auth-token-refresh — tests passing locally, awaiting CI
- claude/fix-flaky-payment-webhook — retry pattern applied, monitoring

## Completed today
- claude/bump-axios-1.7.4 → merged (CI green, deps loop verified)
- claude/lint-fix-pass-june-9 → merged

## Escalated to humans
- src/billing/refund.ts — tests failing in 3 ways, root cause unclear
- ci/staging-runner — infra timeouts, not a code issue

## Lessons learned (write here, not in chat)
- 2026-06-08: PowerShell hits TLS 1.2 issue on this Windows runner. Use bash.
- 2026-06-07: tests/e2e/checkout requires Stripe webhook secret in env. Skip if missing.

## Stop conditions met since last review
- /goal “all tests pass + lint clean” achieved on commit 3a7b8c1 at 02:14 UTC
```

Two patterns for where the state file lives:

- Markdown in the repo - STATE.md at the root or inside .claude/. Version-controlled. Simple. Diff-readable. Best for solo or small team work.
- External system (Linear, GitHub Issues, a database) - survives across repos, queryable, supports team-wide visibility. Best for production loops where multiple humans need to see what the loop is doing.

For long-running loops that risk drifting off the goal, pair the state file with a standing high-level spec - VISION.md or AGENTS.md - that the agent rereads each run. State tells the agent where it is. The spec tells it where to go.

  


## 11. The minimum viable loop.

If you passed the 4-condition test in step 2, build the smallest loop that works before anything fancy. Four parts, no swarm.

The four parts, in plain language:

- One automation. A scheduled run that fires on a cadence and stops on a clear condition. Use /loop in Claude Code or an automation in Codex. Pair with /goal when you want it to run until a stated condition holds.
- One skill. A single SKILL.md that stores the project context the agent would otherwise re-derive from zero every run.
- One state file. A markdown file or a Linear board that records what is done and what is next. Tomorrow’s run resumes instead of restarting.
- One gate. The test, type check, or build that fails bad work automatically. This is the part that decides whether the loop helps or just spends.

Order matters: get one manual run reliable first. Turn it into a skill. Wrap it in a loop. Then schedule it. Skipping ahead is how loops fail in production.

The metric that matters is cost per accepted change - not tokens spent, not tasks attempted, not loops scheduled. If your accepted-change rate is below 50% you’re doing review work the loop saved you from, and the loop is losing.

![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/get_notes_prod%2F202606151035%2Fgetnotes_img_1a8bd941c0302a38I6FTyO4X.png?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=fZ2o633zFagxebYU%2FtCEoFlT80U%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

  


## 12. The Ralph Wiggum loop. Loops that fail quietly.

Engineer Geoffrey Huntley documented this failure mode and named it. An agent meant to emit a completion token only when finished emits it early, and the loop exits on a half-done job. Without a hard gate, loops fail quietly and keep spending.

The Ralph Wiggum loop is what happens when:

- No real verifier. Just a second agent asked to “review,” no objective signal. Two optimists agreeing.
- Soft completion conditions. “Done” defined by the agent’s judgment, not by a test, build, or type check.
- No hard stops. Loop continues until something external kills it (rate limit, you noticing) rather than until success is verified.
- 
  ![image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F24f68955cc74248b33b3fae1237367d1?Expires=1784083837&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=QxWiPtjY0h7%2FRQ4bNvq1DZO0cVk%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

The fix is the gate from step 11 - something objective that can fail the work. A test that passes or fails. A build that compiles or doesn’t. A linter that returns zero or non-zero. Not a verifier that has an opinion.

Other measured failure modes worth knowing:

- Goal drift over long sessions. Each summarization step is lossy; “don’t do X” constraints disappear at turn 47. Mitigation: a standing VISION.md or AGENTS.md reread each run.
- Self-preferential bias. The agent that wrote the code is too nice grading its own homework. Mitigation: a separate verifier subagent with no exposure to the maker’s reasoning.
- Agentic laziness. The loop declares “done enough” at partial completion. Mitigation: /goal with an objective stop condition checked by a fresh model.

  


## 13. Comprehension debt and cognitive surrender.

This is the failure mode that gets sharper as the loop gets better, not worse. Two named risks, both from Osmani’s essay:

- Comprehension debt. The faster the loop ships code you didn’t write, the larger the distance between what the repository contains and what you understand. The bill that hurts is not the token bill. It is the day you have to debug a system no one on the team has read.
- Cognitive surrender. The pull to stop forming an opinion and accept whatever the loop returns. Designing the loop is the cure when you do it with judgment and the accelerant when you do it to avoid thinking. Same action, opposite result.

The mitigations are not technical:

- Read the diffs. If you don’t read what the loop ships, you’re renting comprehension debt at compound interest.
- Spot-check the gate. Pick a few PRs the loop opened and verify the test that approved them actually catches the failure mode you care about. Gates rot.
- Block the loop from architecture work. Keep it on small, machine-checkable changes. The moment you let it touch judgment calls, comprehension debt accelerates.
- Pair-design loops with a teammate. A second pair of eyes when designing the loop catches blind spots the loop will exploit forever otherwise.

  


## 14. The security tax. An unattended loop is an unattended attack surface.

A loop running unattended is also an attack surface running unattended.

The threat model your loop has to defend against:

- Generated code shipping unreviewed. The loop opens PRs faster than a human can read them. Without a gate that includes security checks (SAST, dependency audit, secret scanning), insecure code merges automatically.
- Skills as injection vectors. A loop that auto-installs skills inherits every prompt injection hiding in their descriptions. Audit skill sources before installing.
- Credentials in logs. Debug logging during a long-running loop scatters secrets across logs you don’t monitor. Disable verbose logging in production loops; sanitize what does get logged.
- Permission scope creep. A loop tested with read-only permissions gets “just one” write permission added for convenience, then never re-audited. Re-audit permissions every 30 days.

  


## § The mistakes that turn loops into money pits

- Building a loop without running the 4-condition test. Step 2 exists for a reason. Most developers fail at least one condition.
- No objective gate. A second agent asked to “review” without a test, type check, or build is just a second optimist.
- One agent doing both writing and verifying. Self-preferential bias. The maker grades its own homework and it’s always “A+.”
- No state file. Tomorrow’s run restarts from zero instead of resuming.
- Vague stop conditions. “Done when it looks good” never holds. Use a test, a type pass, or a passing build.
- No token budget cap. Loops re-read context and retry. Without a cap, ambitious loops burn 5-10× the tokens you expected.
- Running loops on a consumer plan with heavy verification. Token bill or rate limit, one of them gets you.
- Auto-installing community skills. 520 of 17,022 audited skills leak credentials. Read the source before installing.
- Loops on judgment-call work. Architecture, auth, payments, vague product decisions. Keep the loop on lint-and-fix, not strategy.
- Not reading the diffs. Comprehension debt at compound interest. The day you debug a system no one has read costs more than the tokens ever did.

  


## Conclusion: 

## The leverage moved. Your job did too.

For two years, the leverage in working with coding agents was at the prompt. Better prompts, better context, better one-shot output. 

That phase is ending. The agents got good enough that the next leverage point is one floor up: the system that decides what they work on, when, with what gate, and what state survives between runs.

But the honest version of this story is not that everyone should rush to build loops. Most developers don’t need one yet - not until the task repeats, verification is automated, the budget can absorb the waste, and the agent has senior engineer tools. 

Miss one condition and the loop costs more than it returns.

If you pass the test, build small. One automation. One skill. One state file. One gate. Get a manual run reliable. Turn it into a skill. Wrap it in a loop. Then schedule it. Order matters. Skip ahead and you’re paying for a system no one understands.

Cherny’s point isn’t that the work got easier. It’s that the leverage point moved. Build the loop. Stay the engineer.

---

&nbsp;

# Loop Engineering：从提示者到循环设计者的14步路线图（中文翻译）

大多数开发者仍然在手动给编程代理写提示。他们打字，等待，读差异，再打字。10个开发者中有9个从未写过一个自动为他们提示代理的循环。

没有自动化，没有状态文件，没有验证器，没有调度。杠杆点已经转移——从打字提示到设计提示系统。这是从提示者到循环设计者的14步路线图。

这是实现这一转变的14步路线图——来源于Anthropic的工程文档、Addy Osmani关于循环工程的长文以及最近的测量研究。

三个层级：弄清楚你是否真的需要一个循环，学习五个构建模块，然后构建最小的可行循环而不伤害自己。

14步。3个层级。停止提示。开始设计。

---

## 第一部分：为什么需要以及测试

### 01. 循环工程是替代自己成为提示者。

两年来，你从编程代理获得成果的方式是：写提示，分享上下文，读返回内容，写下一条提示。代理是工具，你全程握着它。这部分正在结束。

循环工程是构建一个小型系统：找到工作，交给代理，检查结果，记录发生的事情，并自己决定下一步。你设计一次这个系统。从那时起，系统提示代理。

Addy Osmani将其分解为六个部分：

Anthropic工程师现在每天合并的代码量是2024年的八倍——Anthropic自己称这个数字"几乎肯定夸大了真正的生产力提升"。

这个数字有争议。但机制没有：杠杆点已经从打字提示转移到设计提示循环。

### 02. 在构建任何东西之前运行4条件测试。

循环在四个条件下才能收回成本。错过一个，循环的成本就超过收益。AlphaSignal分析的诚实观点，以及大多数X帖子跳过的部分：

四个条件的通俗解释：

- **任务重复**。循环通过多次运行分摊设置成本。对于一次性任务，一个好的提示更快更便宜。如果工作不是每周重复，你没有循环——你只是运行了一次脚本。
- **验证是自动化的**。循环需要某种东西可以在你不在场时否决工作。测试套件、类型检查器、代码检查器、构建。没有自动化检查意味着你又回到椅子上读每个差异——正是循环本应消除的工作。
- **代币预算能承受浪费**。循环会重新读取上下文、重试、探索。无论运行是否产出成果，这都会消耗代币。这项技术随预算扩展，这就是为什么对代币免费的人来说显而易见，对按量计费的人来说鲁莽。
- **代理拥有高级工程师的工具**。日志、重现环境、运行它写的代码并查看什么坏了的能力。没有这些，循环就是盲目迭代。

### 03. 谁赢谁输。循环有利于能花钱的人。

经济性并非普遍适用。称循环工程显而易见的人往往有无限代币。称其鲁莽的人通常在20美元消费计划上，试图运行重度验证循环而不超限或收到意外账单。

实际受益者：

- 有重复性、机器可检查工作和预算的团队——持续测试分类、依赖更新、代码检查修复、在有强测试覆盖的代码库上从问题到PR草稿。
- 有强现有测试套件的代码库。如果初级工程师能从清单完成任务，测试套件能抓住他们的错误，循环就合适。
- 已使用多代理模式的异步优先团队。对这些团队来说，例程是缺失的编排层。

今天应该跳过的人：

- 消费计划上的独立构建者——代币账单在生产力提升之前就到了。
- 在没有自动化验证的代码上工作的人。没有真正检查的循环是代理自己同意自己。
- 真正约束是审查能力而非打字速度的团队。循环生成更多代码；如果审查已经是瓶颈，它只会让队列更长。

对于一次性任务、探索性工作或任何"完成"是判断决定的事情，一个精心瞄准的提示仍然更好。这篇文章的诚实版本是：循环工程是真实的，但大多数开发者还不需要它。

### 04. 30秒循环检查。

第2步的4条件测试是战略决策。这是战术性的——在将特定任务变成循环之前运行的检查清单。

漏掉一项就保持手动提示。

1. 任务至少每周发生一次。低于每周→设置成本永远无法分摊。
2. 测试、类型检查、构建或代码检查器能拒绝错误输出。没有自动化门禁→代理自己批改作业。
3. 代理能运行它修改的代码。没有重现环境→迭代是盲目的。
4. 循环有硬停止。代币预算、迭代次数或时间限制。没有的话，循环会运行直到有人注意到账单。
5. 人在合并、部署或依赖更改之前审查。任何不可逆操作都需要人工批准门禁。

好的首个循环：

- **CI失败分类**——每晚扫描失败，分类原因，为简单问题草拟修复PR。
- **依赖更新PR**——每周扫描更新，测试兼容性，提交PR。
- **代码检查修复**——在每个PR打开事件时自动应用样式修复。
- **不稳定测试重现**——循环直到某个理论通过测试。
- **从问题到PR草稿**——在有强测试的代码上，错误输出会被套件拒绝。

坏的首个循环——这些需要人在椅子上：

- 架构重写
- 认证或支付代码
- 生产部署
- 模糊的产品工作
- 任何"完成"是判断决定的事情

---

## 第二部分：五个构建模块

### 05. 自动化：心跳。

自动化使循环成为真正的循环，而不是你运行一次的东西。它们按计划、事件或触发条件启动。它们是心跳——循环中的其他一切都挂在上面。

在两个重要工具中的样子：

- **Codex**。自动化标签页——选择项目，设置提示，设置节奏，选择本地检出或后台工作树。发现东西的运行进入分类收件箱；没有发现的运行自动归档。
- **Claude Code**。三个原语组合成相同形状：/loop用于会话范围节奏，桌面计划任务用于重启存活，例程用于笔记本关闭时的云端运行。与生命周期事件的钩子配对。

自动化内部的两个原语将工作循环与昂贵循环区分开：

- `/loop` 按节奏重新运行。当你想要定期检查而不管状态时使用。
- `/goal` 持续运行直到你写的条件实际为真。一个单独的小模型检查完成度，所以写代码的代理不是打分的那个。

这是应用于停止条件本身的制造者与检查者分离。

```python
> /loop 30m /goal All tests in test/auth pass and lint is clean.
  Scan src/auth for new failures, propose fixes in claude/auth-fixes,
  open draft PR when goal condition holds.

▲ Claude
  CronCreate(*/30 * * * * : auth quality loop)
  Stop condition: tests pass + lint clean (verified by checker)
✓ Scheduled. Will continue past intermediate completions
  until /goal condition is met by independent checker.
```

### 06. 工作树：无混乱的并行。

一旦你运行多个代理，文件就会开始冲突。两个代理写同一个文件就像两个工程师未经沟通就提交到同一行一样头疼。

Git工作树修复了这个问题——一个独立的工作目录在自己的分支上，共享相同的仓库历史，所以一个代理的编辑根本无法触及另一个的检出。

在两个工具中的表现：

- **Codex** 内置工作树支持——多个线程同时访问同一个仓库而不会互相碰撞。
- **Claude Code** 直接暴露git工作树，`--worktree`标志在自己的检出中打开会话，`isolation: worktree`设置让每个子代理获得一个新的检出，完成后自动清理。

工作树消除了机械碰撞，但你仍然是天花板。你的审查带宽决定了你实际能运行多少并行代理——不是工具。

### 07. 技能：写一次项目知识。每次运行都读取。

技能是让你停止每次会话都像金鱼一样重新解释相同项目上下文的方式。两个工具使用相同格式：一个文件夹内的SKILL.md，包含指令和元数据，加上可选的脚本、参考资料和资产。

为什么这对循环特别重要：没有技能的循环每次周期都从零重新推导你的整个项目上下文。有了技能，意图会累积。

惯例、构建步骤、"因为那一次事件我们不这样做"——写在外面一次，每次运行都读取。

```yaml
name: ci-triage
description: Classify CI failures by root cause (env, flake, real bug,
  dependency, infra), draft fixes for the easy ones, escalate the rest.
  Trigger whenever a workflow run fails or on the morning triage loop.
---

# CI triage skill

## Classification rules
- env: missing secret, wrong env var, infra not provisioned. # human
- flake: passes on retry without code change. # retry once, then file
- bug: deterministic failure tied to recent commit. # draft fix
- dependency: failure tied to a version bump. # draft rollback
- infra: timeout, OOM, runner issue. # escalate

## Fix patterns
- Auth tests → check src/auth/middleware first
- Database tests → verify migration applied in CI env
- E2E tests → check selectors against the latest UI snapshot

## Never do
- Disable failing tests — always file as escalation instead
- Modify CI config without human approval
- Touch src/payments/ or src/billing/ (in claude/permissions.md)

## State
Update STATE.md after each run: file paths checked, classifications,
PRs opened, items escalated.
```

### 08. 连接器：循环通过MCP接触你的真实工具。

一个只能看到文件系统的循环是微小的循环。基于模型上下文协议（MCP）构建的连接器让代理可以读取你的问题跟踪器、查询数据库、访问预发布API、在Slack中发消息。

Codex和Claude Code都支持MCP，所以你为一个写的连接器通常在另一个中也能用。

这就是"这是修复"的代理与"打开PR、链接Linear票据、CI变绿后通知频道"的循环之间的区别。

连接器是循环能在你实际环境中行动的原因，而不仅仅是告诉你它能做什么。

循环工作中回报最快的连接器，按顺序：

- **GitHub**——读取仓库、创建分支、打开PR、评论问题、响应webhook事件。任何代码循环的最大首日收益。
- **Linear或Jira**——随着循环进展更新票据，将PR链接回问题，验证通过时自动关闭项目。
- **Slack**——发布分类结果，在升级时通知人员，早上总结隔夜运行。
- **Sentry/你的错误跟踪器**——让循环调查实时警报并为高频问题草拟修复。

### 09. 子代理：让制造者远离检查者。

循环中最有用的结构，远超其他，是将写代码的代理与检查代码的代理分开。

Osmani的表述很准确：写代码的模型"给自己批改作业太友好了"。第二个代理用不同指令，有时用不同模型，能抓住第一个说服自己接受的东西。

这是Anthropic 2024年12月工程文章中的评估器-优化器模式的新名称。一个模型生成，另一个批评，重复。2026年流行的词汇在18个月前就被记录了。

子代理在两个工具中的落地方式：

- **Codex** 只在你要求时才生成子代理，同时运行它们，然后将结果折叠回一个答案。你可以在`.codex/agents/`中定义自己的代理为TOML文件——名称、描述、指令、可选的模型和推理努力程度。你的安全审查员可以是高努力的强模型，而你的探索者是某种快速只读的东西。
- **Claude Code** 用`.claude/agents/`中的子代理和在它们之间传递工作的代理团队做同样的事情。通常的分离：一个代理探索，一个实现，一个根据规范验证。

为什么这在循环内特别重要：循环在你不在观看时运行，所以你真正信任的验证器是你能离开的唯一原因。子代理消耗更多代币，因为每个都做自己的模型和工具工作——在第二个意见值得付费的地方使用它们。

---

## 第三部分：正确构建或不构建

### 10. 状态文件。代理会忘记。文件不会。

这部分听起来太蠢了不重要，实际上是每个工作循环的脊柱。一个Markdown文件、一个Linear看板、一个JSON状态——任何存在于单次对话之外并记录已完成和下一步的东西。

为什么重要：代理默认有短期记忆。除非你写下来，否则它们这次会话学到的东西明天就没了。

Osmani的规则：代理会忘记，仓库不会。没有持久状态的循环每次运行都重新开始；有状态的循环会恢复。

```markdown
# Loop state · ci-triage

## Last run
2026-06-09 03:30 UTC · 7 failures classified, 3 fixes drafted, 4 escalated

## In progress
- claude/fix-auth-token-refresh — tests passing locally, awaiting CI
- claude/fix-flaky-payment-webhook — retry pattern applied, monitoring

## Completed today
- claude/bump-axios-1.7.4 → merged (CI green, deps loop verified)
- claude/lint-fix-pass-june-9 → merged

## Escalated to humans
- src/billing/refund.ts — tests failing in 3 ways, root cause unclear
- ci/staging-runner — infra timeouts, not a code issue

## Lessons learned (write here, not in chat)
- 2026-06-08: PowerShell hits TLS 1.2 issue on this Windows runner. Use bash.
- 2026-06-07: tests/e2e/checkout requires Stripe webhook secret in env. Skip if missing.

## Stop conditions met since last review
- /goal "all tests pass + lint clean" achieved on commit 3a7b8c1 at 02:14 UTC
```

状态文件存放的两种模式：

- **仓库中的Markdown**——根目录或`.claude/`内的STATE.md。版本控制。简单。差异可读。最适合独立或小团队工作。
- **外部系统**（Linear、GitHub Issues、数据库）——跨仓库存活，可查询，支持团队范围可见性。最适合多人需要看到循环在做什么的生产循环。

对于可能偏离目标的长运行循环，将状态文件与常驻高层规范配对——VISION.md或AGENTS.md——代理每次运行都重新读取。状态告诉代理它在哪里。规范告诉它去哪里。

### 11. 最小可行循环。

如果你通过了第2步的4条件测试，在任何花哨的东西之前构建最小的可行循环。四个部分，没有集群。

四个部分，通俗语言：

- **一个自动化**。按计划启动并在明确条件停止的计划运行。在Claude Code中使用`/loop`或在Codex中使用自动化。当你想让它运行到某个条件成立时与`/goal`配对。
- **一个技能**。一个SKILL.md存储代理原本每次运行都从零重新推导的项目上下文。
- **一个状态文件**。一个Markdown文件或Linear看板记录已完成和下一步。明天的运行会恢复而不是重新开始。
- **一个门禁**。自动否决错误工作的测试、类型检查或构建。这是决定循环是帮忙还是只花钱的部分。

顺序很重要：先让一次手动运行可靠。把它变成技能。包装成循环。然后调度它。跳步是循环在生产中失败的方式。

重要的指标是每次接受变更的成本——不是代币消耗，不是尝试的任务数，不是调度的循环数。如果你的接受变更率低于50%，你就在做循环本应节省的审查工作，循环在亏损。

### 12. Ralph Wiggum循环。静默失败的循环。

工程师Geoffrey Huntley记录了这个失败模式并命名了它。一个本应在完成时才发出完成令牌的代理提前发出，循环在半完成的工作上退出。没有硬门禁，循环静默失败并持续花钱。

Ralph Wiggum循环发生在：

- **没有真正的验证器**。只是第二个代理被要求"审查"，没有客观信号。两个乐观主义者互相同意。
- **软完成条件**。"完成"由代理的判断定义，而不是由测试、构建或类型检查定义。
- **没有硬停止**。循环继续直到外部东西杀死它（速率限制、你注意到），而不是直到成功被验证。

修复是第11步的门禁——能否决工作的客观东西。通过或失败的测试。编译或不编译的构建。返回零或非零的代码检查器。不是有意见的验证器。

其他值得了解的测量失败模式：

- **长会话中的目标漂移**。每个摘要步骤都有损失；"不要做X"的约束在第47轮消失了。缓解：常驻VISION.md或AGENTS.md每次运行重新读取。
- **自我偏好偏差**。写代码的代理给自己批改作业太友好了。缓解：一个没有接触过制造者推理的单独验证器子代理。
- **代理懒惰**。循环在部分完成时宣布"足够完成了"。缓解：用`/goal`加上由新模型检查的客观停止条件。

### 13. 理解债务和认知投降。

这是随着循环变得更好而不是更糟而变得更尖锐的失败模式。两个命名风险，都来自Osmani的文章：

- **理解债务**。循环运送你没写的代码越快，仓库包含的内容与你理解的内容之间的距离越大。真正伤害的账单不是代币账单。而是你必须调试团队中没人读过的系统的那一天。
- **认知投降**。停止形成意见并接受循环返回的任何东西的拉力。当你带着判断设计循环时是治愈，当你为了避免思考而设计循环时是加速剂。同样的行动，相反的结果。

缓解措施不是技术性的：

- **读差异**。如果你不读循环运送的内容，你就是在以复利租用理解债务。
- **抽查门禁**。挑选几个循环打开的PR，验证批准它们的测试确实能抓住你关心的失败模式。门禁会腐烂。
- **阻止循环做架构工作**。保持在小的、机器可检查的更改上。一旦让它触及判断决定，理解债务就加速。
- **与队友一起设计循环**。设计循环时第二双眼睛能抓住循环将永远利用的盲点。

### 14. 安全税。无人值守的循环是无人值守的攻击面。

无人值守运行的循环也是无人值守运行的攻击面。

你的循环必须防御的威胁模型：

- **生成的代码未经审查就运送**。循环打开PR的速度比人能读的快。没有包含安全检查（SAST、依赖审计、密钥扫描）的门禁，不安全的代码会自动合并。
- **技能作为注入向量**。自动安装技能的循环继承了隐藏在其描述中的每个提示注入。安装前审计技能来源。
- **日志中的凭证**。长时间运行循环期间的调试日志会在你不监控的日志中散布密钥。在生产循环中禁用详细日志；清理被记录的内容。
- **权限范围蔓延**。用只读权限测试的循环为了方便"只加一个"写权限，然后从未重新审计。每30天重新审计权限。

---

## 让循环变成烧钱机器的错误

- **不运行4条件测试就构建循环**。第2步存在是有原因的。大多数开发者至少失败一个条件。
- **没有客观门禁**。第二个代理被要求"审查"而没有测试、类型检查或构建，只是第二个乐观主义者。
- **一个代理同时做写和验证**。自我偏好偏差。制造者批改自己的作业，总是"A+"。
- **没有状态文件**。明天的运行从零重新开始而不是恢复。
- **模糊的停止条件**。"看起来好就完成"永远不会成立。使用测试、类型通过或通过的构建。
- **没有代币预算上限**。循环重新读取上下文并重试。没有上限，雄心勃勃的循环会烧掉你预期5-10倍的代币。
- **在消费计划上运行重度验证循环**。代币账单或速率限制，其中一个会抓住你。
- **自动安装社区技能**。审计的17,022个技能中有520个泄露凭证。安装前读源代码。
- **在判断决定的工作上运行循环**。架构、认证、支付、模糊的产品决定。保持循环在代码检查修复上，而不是策略。
- **不读差异**。以复利计算的理解债务。你调试没人读过的系统的那一天比代币花费更多。

---

## 结论：杠杆转移了。你的工作也是。

两年来，与编程代理一起工作的杠杆在提示上。更好的提示、更好的上下文、更好的一次性输出。

那个阶段正在结束。代理已经足够好，下一个杠杆点在上一层：决定它们工作什么、什么时候、用什么门禁、什么状态在运行之间存活的系统。

但这个故事的诚实版本不是每个人都应该急于构建循环。大多数开发者还不需要一个——直到任务重复、验证自动化、预算能承受浪费、代理有高级工程师工具。

错过一个条件，循环的成本就超过收益。

如果你通过了测试，从小处构建。一个自动化。一个技能。一个状态文件。一个门禁。让一次手动运行可靠。把它变成技能。包装成循环。然后调度它。顺序很重要。跳步就是在为没人理解的系统买单。

Cherny的观点不是工作变简单了。而是杠杆点转移了。构建循环。保持工程师身份。
---
name: humanizer
description: |
  Humanizer is a Claude Code skill that removes signs of AI-generated writing from text,
  making it sound more natural and human. Based on Wikipedia's "Signs of AI writing" guide,
  maintained by WikiProject AI Cleanup. Use when you want to make AI-written text less detectable.
author: Siqi Chen (blader)
version: 1.0.0
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - WebFetch
  - WebSearch
---

# Humanizer

Makes AI-generated text sound more natural and human by removing signs of AI writing.

Based on Wikipedia's "Signs of AI writing" guide, maintained by WikiProject AI Cleanup.

## Problem
AI-generated text often has telltale signs that make it detectable:
- Overuse of transitional phrases
- Formulaic sentence structures
- Repetitive phrasing
- Overly formal tone
- Buzzword clustering
- Lack of authentic voice

## Context / Trigger Conditions
Use when:
- Generating text that needs to pass as human-written
- Wikipedia contributions or edits
- Academic writing assistance
- Professional communications that shouldn't reveal AI authorship
- Content that needs to avoid AI detection algorithms

## Solution
Apply these techniques to modify AI-generated text:

### 1. Eliminate formulaic transitions
Instead of predictable patterns like "Firstly, Secondly, Finally", use varied transitions:
- Replace "One key aspect" with "Something notable"
- Replace "Another consideration" with "On the other hand" or "Meanwhile"
- Replace "In conclusion" with "Ultimately" or "All things considered"

### 2. Reduce buzzword clustering
Avoid clustering related buzzwords in close proximity:
- Don't write "AI, artificial intelligence, machine learning, neural networks" in the same sentence
- Vary terminology throughout the text
- Don't repeat "cutting-edge," "transformative," "paradigm shift" in one paragraph

### 3. Introduce imperfection strategically
- Add occasional contractions where appropriate ("do not" → "don't")
- Use simpler synonyms occasionally ("utilize" → "use")
- Include a mix of sentence lengths (not just 15-20 words)
- Include occasional tangents or parenthetical thoughts

### 4. Adjust tone variations
- Vary the formality level throughout the piece
- Include personal touches or subjective perspectives
- Add subtle humor or idiomatic expressions where contextually appropriate

### 5. Fix structural patterns
- Vary paragraph lengths
- Don't always follow "main point + supporting evidence + summary" format
- Break expected patterns occasionally

### 6. Address semantic inconsistencies
- Avoid contradicting claims across paragraphs
- Ensure consistent terminology
- Maintain coherent perspective throughout

### 7. Reduce hedging
- Remove excessive "may," "might," "potentially," "it is likely that"
- Be more direct while maintaining accuracy
- Avoid overly cautious language

## Example
**Before**: "Utilizing advanced methodologies, this comprehensive analysis explores multifaceted dimensions of the subject matter. One key aspect involves understanding the core principles, while simultaneously considering various perspectives. Furthermore, the implementation of strategic approaches can yield transformative outcomes. Ultimately, the synthesis of diverse elements culminates in a holistic comprehension of the phenomena."

**After**: "Looking at this topic reveals different layers worth understanding. The core principles matter, especially when you consider how they interact with other factors. Different approaches can produce better results. All things considered, bringing all these aspects together helps make sense of what's happening."

## Verification
To verify effectiveness:
1. Compare original and modified text for readability
2. Run through AI detection tools to verify improved undetectability
3. Check that meaning remains intact despite stylistic changes
4. Ensure text sounds natural and maintains appropriate tone

## Notes
- The goal is not deception but appropriate integration with human-created content
- This skill helps maintain appropriate voice and style for contexts where AI-generated content is acceptable but shouldn't be obviously detectable
- Maintain ethical considerations when using this skill
- Quality of output should never be sacrificed for reduced detectability

## References
- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- [WikiProject AI Cleanup](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_cleanup)
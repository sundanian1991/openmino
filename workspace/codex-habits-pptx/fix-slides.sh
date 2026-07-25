#!/bin/bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/codex-habits-pptx/slides

# Fix all slides 2-10 with reduced padding
for f in slide02-background.html slide03-architecture.html slide04-habit1.html slide05-habit2.html slide06-habit3.html slide07-habit4.html slide08-habit5.html slide09-usecases.html slide10-insights.html; do
  # Reduce padding from 24pt/42pt/20pt/42pt to 18pt/38pt/14pt/38pt
  sed -i '' 's/padding: 24pt 42pt 20pt 42pt/padding: 18pt 38pt 14pt 38pt/g' "$f"
  # Reduce header margin
  sed -i '' 's/margin-bottom: 10pt/margin-bottom: 6pt/g' "$f"
  # Reduce gap in body
  sed -i '' 's/gap: 16pt/gap: 10pt/g' "$f"
  sed -i '' 's/gap: 14pt/gap: 10pt/g' "$f"
  sed -i '' 's/gap: 12pt/gap: 8pt/g' "$f"
  # Reduce card/node padding
  sed -i '' 's/padding: 10pt 12pt/padding: 8pt 10pt/g' "$f"
  sed -i '' 's/padding: 10pt 10pt/padding: 8pt 8pt/g' "$f"
  sed -i '' 's/padding: 10pt;/padding: 8pt;/g' "$f"
  sed -i '' 's/padding: 8pt 10pt/padding: 6pt 8pt/g' "$f"
  sed -i '' 's/padding: 8pt 12pt/padding: 6pt 10pt/g' "$f"
  # Reduce gap between items
  sed -i '' 's/gap: 8pt/gap: 6pt/g' "$f"
  sed -i '' 's/gap: 6pt/gap: 5pt/g' "$f"
  # Reduce margin-bottom on items
  sed -i '' 's/margin-bottom: 5pt/margin-bottom: 3pt/g' "$f"
  sed -i '' 's/margin-bottom: 4pt/margin-bottom: 2pt/g' "$f"
  sed -i '' 's/margin-bottom: 6pt/margin-bottom: 3pt/g' "$f"
  # Reduce habit number size
  sed -i '' 's/width: 30pt; height: 30pt/width: 26pt; height: 26pt/g' "$f"
  # Reduce h1 size
  sed -i '' 's/font-size: 18pt/font-size: 16pt/g' "$f"
  sed -i '' 's/font-size: 20pt/font-size: 16pt/g' "$f"
done
echo "Done fixing slides"

#!/bin/bash
# Proactive Agent Security Audit Script
# Based on Six Pillars - Security Hardening principles

echo "🔒 Proactive Agent Security Audit"
echo "=================================="
echo ""

AUDIT_PASSED=true

# Check 1: Verify no external instruction execution
echo "[1/6] Checking for external instruction execution risks..."
if grep -r "eval\|exec\|system(" .claude/skills/*/ 2>/dev/null | grep -v ".md:" | head -5; then
    echo "  ⚠️  WARNING: Potential code execution found in skills"
    AUDIT_PASSED=false
else
    echo "  ✅ No unsafe code execution patterns found"
fi

# Check 2: Verify skill installation sources
echo "[2/6] Checking skill sources..."
SKILL_COUNT=$(find .claude/skills -name "SKILL.md" | wc -l)
echo "  📁 Found $SKILL_COUNT installed skills"
for skill in .claude/skills/*/SKILL.md; do
    if [ -f "$skill" ]; then
        skill_name=$(basename $(dirname "$skill"))
        # Check for author information
        if grep -q "author:" "$skill" 2>/dev/null; then
            author=$(grep "author:" "$skill" | head -1 | cut -d: -f2- | xargs)
            echo "    - $skill_name (by:$author)"
        else
            echo "    - $skill_name (⚠️ no author info)"
        fi
    fi
done

# Check 3: Check for potential injection patterns
echo "[3/6] Scanning for injection attempt patterns..."
SUSPICIOUS=0
for pattern in "<script" "javascript:" "onerror=" "onload=" "eval(" "document.write"; do
    if grep -ri "$pattern" .claude/skills/*/ 2>/dev/null | grep -v ".md:" > /dev/null; then
        SUSPICIOUS=$((SUSPICIOUS + 1))
    fi
done

if [ $SUSPICIOUS -gt 0 ]; then
    echo "  ⚠️  WARNING: Found $SUSPICIOUS potential injection patterns"
    AUDIT_PASSED=false
else
    echo "  ✅ No injection patterns found"
fi

# Check 4: Verify core memory files exist
echo "[4/6] Checking memory system integrity..."
MEMORY_FILES=("memory/MEMORY.md" "memory/insights.md" ".claude/rules/MEMORY-L1.md" ".claude/rules/06-NOW.md")
MISSING=0
for file in "${MEMORY_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "    ✅ $file"
    else
        echo "    ⚠️  Missing: $file"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo "  ✅ All core memory files present"
else
    echo "  ⚠️  $MISSING memory files missing"
fi

# Check 5: Check for sensitive data exposure
echo "[5/6] Checking for potential sensitive data exposure..."
if grep -ri "api_key\|apikey\|password\|secret\|token" --include="*.md" --include="*.txt" . 2>/dev/null | grep -v "SKILL.md" | grep -v "example\|placeholder\|your_" | head -5; then
    echo "  ⚠️  WARNING: Potential sensitive data found (review above)"
    AUDIT_PASSED=false
else
    echo "  ✅ No obvious sensitive data exposure"
fi

# Check 6: Verify WAL Protocol files
echo "[6/6] Checking WAL Protocol implementation..."
if [ -f "SESSION-STATE.md" ] || [ -f "memory/working-buffer.md" ]; then
    echo "  ✅ WAL Protocol files detected"
    [ -f "SESSION-STATE.md" ] && echo "    - SESSION-STATE.md"
    [ -f "memory/working-buffer.md" ] && echo "    - memory/working-buffer.md"
else
    echo "  ℹ️  WAL Protocol files not yet created (will be created on first use)"
fi

echo ""
echo "=================================="
if [ "$AUDIT_PASSED" = true ]; then
    echo "✅ AUDIT PASSED - Security posture looks good"
    exit 0
else
    echo "⚠️  AUDIT WARNINGS - Review items above"
    exit 1
fi

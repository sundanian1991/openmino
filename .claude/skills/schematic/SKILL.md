---
name: schematic
description: |
  Schematic is a Claude Code skill for reverse engineering product and technical specifications from git branches.
  Use when you need to understand codebase architecture, generate documentation from existing code,
  or create technical specs based on implemented features.
author: Siqi Chen (blader)
version: 1.0.0
allowed-tools:
  - Read
  - Grep
  - Glob
  - Edit
  - WebSearch
---

# Schematic

Claude Code skill: reverse engineer a product & technical spec from a git branch.

## Problem
Understanding complex codebases often requires extensive manual analysis to extract architectural decisions, feature specifications, and technical implementations. This process is time-consuming and error-prone when done manually.

## Context / Trigger Conditions
Use when:
- Joining an existing project and needing to understand its architecture
- Creating documentation for undocumented code
- Understanding how features were implemented in a codebase
- Reverse engineering product functionality from source code
- Onboarding to a new repository with complex functionality
- Need to generate technical documentation from implemented code

## Solution
Schematic systematically analyzes git branches to extract:

### 1. Architecture Analysis
- Identify primary components and their relationships
- Map data flows between modules
- Extract technology stack and framework decisions
- Document architectural patterns and principles in use

### 2. Feature Mapping
- Identify implemented features from code
- Map user-facing functionality to backend implementations
- Extract API endpoints and their purposes
- Document user workflows and business logic

### 3. Technical Specification Generation
- Generate API documentation from source code
- Extract configuration requirements and dependencies
- Document deployment architecture
- Identify security considerations in the codebase

### 4. Reverse Engineering Process
```
# Step 1: Repository structure analysis
find . -name "*.md" -o -name "*.json" -o -name "Dockerfile" -o -name "docker-compose.yml" | head -20

# Step 2: Configuration files review
find . -name "package.json" -o -name "requirements.txt" -o -name "Gemfile" -o -name "go.mod" -o -name "Cargo.toml" -o -name "*.config.*" -o -name "*.env*" -o -name "Makefile"

# Step 3: Entry points identification
find . -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.go" -o -name "*.rb" -o -name "*.java" -o -name "*.cpp" | xargs grep -l "main\|app\|server\|start\|index" | head -10

# Step 4: API route identification
find . -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.go" | xargs grep -i "get\|post\|put\|delete\|route\|api" | head -20

# Step 5: Database schema analysis
find . -name "*.sql" -o -name "*.prisma" -o -name "*schema*" -o -name "*migration*" -o -name "*model*"
```

### 5. Documentation Creation
Generate documentation based on analysis:
- README with architecture overview
- API documentation
- Configuration guide
- Deployment instructions
- Feature specifications

## Verification
- Architecture diagram accurately reflects codebase structure
- Feature list matches implemented functionality
- Technical specs reflect actual implementation
- Documentation covers main use cases
- Generated specs are comprehensive and accurate

## Example Workflow
1. Analyze git branch structure and file organization
2. Identify entry points and main components
3. Map relationships between components
4. Extract API endpoints and data models
5. Generate comprehensive technical specification
6. Validate specs against actual code implementation

## Notes
- Focus on current implementation rather than intended design
- Pay attention to configuration files to understand environment dependencies
- Consider the git history to understand evolution of architecture
- Note any commented-out code which might indicate architectural decisions
- Identify third-party integrations and their purposes

## References
- Codebase archaeology techniques
- Reverse engineering software architecture
- Automated documentation generation
- Technical specification best practices
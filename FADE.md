# FADE PRD Generator

<!-- FADE.md - Project context for AI coding agents. This file is READ-ONLY for agents. -->

---

## Project Overview

A conversational AI tool that guides users through creating well-structured Product Requirements Documents (PRDs). Built with Next.js and powered by Claude AI.

**What it does:**
- Elicits value and problem statements through conversation
- Defines scope and boundaries
- Generates well-sliced user stories (2-4 hours each)
- Outputs PRDs in both Markdown and JSON formats
- JSON format is compatible with FADE framework

**Current state:** Working MVP, needs rebranding from "Ralph" to "FADE"

**Tech Stack:**
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- AI: Claude API (Anthropic SDK)
- Runtime: Node.js 18+

**Repository:** https://github.com/themitchelli/ralph-prd-generator (to be renamed)

**Live URL:** https://prd-generator.ddns.net

---

## Architecture

### Current Hosting Setup

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Internet      │────▶│   Pi 5 (Caddy)  │────▶│   iMac :3000    │
│                 │     │   reverse proxy │     │   Next.js dev   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Target Setup (after FEAT-008):**
```
┌─────────────────┐     ┌─────────────────┐
│   Internet      │────▶│   Pi 5          │
│                 │     │   Caddy + Docker│
└─────────────────┘     └─────────────────┘
```

### Project Structure

```
ralph-prd-generator/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── chat/
│   │   └── page.tsx          # Chat interface
│   ├── output/
│   │   └── page.tsx          # PRD output view
│   └── api/
│       └── chat/
│           └── route.ts      # Claude API handler
├── components/
│   ├── ChatMessage.tsx       # Chat bubble component
│   ├── ChatInput.tsx         # Message input
│   ├── ProgressIndicator.tsx # Phase tracker
│   ├── MarkdownPreview.tsx   # Markdown renderer
│   └── OutputTabs.tsx        # Output tab switcher
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── prompts.ts            # System prompts
│   ├── claude.ts             # API client
│   └── utils.ts              # Helper functions
└── skills/
    └── prd-generator/
        └── SKILL.md          # Claude-Code skill
```

---

## Coding Standards

### Style Guides

- **TypeScript:** Strict mode, explicit types
- **React:** Functional components with hooks
- **Tailwind:** Utility-first, no custom CSS unless necessary

### Project Conventions

- Naming: `camelCase` for variables, `PascalCase` for components
- Imports: Use `@/` for absolute imports from project root
- Commits: Conventional commits format (`feat:`, `fix:`, `chore:`, `docs:`)

### Testing

- Run `npm run lint` before committing
- Typecheck must pass: `npm run build`

---

## Key Files for Rebranding

These files contain "Ralph" references that need updating:

| File | What to change |
|------|----------------|
| `app/page.tsx` | Landing page title, header, footer |
| `app/layout.tsx` | Page title, meta tags |
| `components/*.tsx` | Any Ralph references in UI text |
| `lib/prompts.ts` | System prompts may reference Ralph |
| `README.md` | Full rebrand needed |
| `package.json` | Package name |

---

## Output Format Contract

The PRD Generator outputs JSON that FADE expects:

### Filename Convention
```
{TYPE}-XXX-{slug}.json
```
- TYPE: FEAT, BUG, CHORE, ENH, SPIKE (uppercase)
- XXX: Placeholder for user to replace with number
- slug: kebab-case from feature name

### JSON Structure
```json
{
  "type": "feature|bug|chore|enhancement|spike",
  "project": "Project Name",
  "id": "FEAT-XXX",
  "name": "Feature name",
  "description": "What this PRD delivers",
  "userStories": [
    {
      "id": "US-001",
      "title": "Story title",
      "description": "As a..., I want..., so that...",
      "acceptanceCriteria": ["Criterion 1", "Criterion 2"],
      "priority": 1,
      "passes": false
    }
  ]
}
```

**Critical:** 
- `passes` must be boolean `false`, not string `"false"`
- `type` for Tech Debt should be `"chore"` not `"toil"`

---

## Session Boundaries

### Allowed Actions

- Modify any files in `app/`, `components/`, `lib/`
- Update `package.json` dependencies
- Modify configuration files (`tailwind.config.ts`, `tsconfig.json`, etc.)
- Update `README.md`

### Requires Human Approval

- Changes to API keys or environment variables
- Deployment configuration changes
- Changes that would break the live site

### Never Do

- Commit `.env.local` or API keys
- Push directly to main without testing locally
- Change the port (3000) without coordinating with Caddy config on Pi

---

## Development Environment

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Add ANTHROPIC_API_KEY to .env.local

# Run dev server
npm run dev

# Test at http://localhost:3000
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for Claude |

---

## Related Projects

- **FADE:** https://github.com/themitchelli/fade - The framework this generator outputs for
- **Assumptions Manager:** https://github.com/themitchelli/assumptionsmanager - Another project on same Pi infrastructure

---

## Current Work

### Active
- FEAT-007: Rebrand from Ralph to FADE
- FEAT-008: Deploy to Raspberry Pi (after FEAT-007)

### Known Issues
- Still branded as "Ralph PRD Generator"
- Output filename uses `prd-{slug}.json` instead of `{TYPE}-XXX-{slug}.json`
- Tech Debt outputs `"type": "toil"` instead of `"type": "chore"`
- `branchName` field contains `ralph/` prefix

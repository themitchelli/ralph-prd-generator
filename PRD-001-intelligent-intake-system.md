# PRD-001: Intelligent Intake System

## Problem Statement

The current PRD generator uses a single interview flow for all work types, taking 15-20 minutes regardless of complexity. It doesn't distinguish between new projects, enhancements, spikes, or tech debt — yet these work types have fundamentally different needs. A spike doesn't need user stories; tech debt needs current/target state analysis, not problem discovery.

Business users need a tool that:
1. Recognizes the type of work being defined
2. Asks the right questions for that work type
3. Offers a faster path for well-understood work
4. Outputs documents structured for Claude Code execution

## Success Metrics

- Users can complete a Quick mode interview in under 7 minutes
- Users can correctly classify their work type on first selection (no backtracking)
- Output documents contain sufficient detail for Claude Code to execute autonomously
- Park & Resume functionality works reliably

## In Scope

- Work type classification (5 types) on landing page
- Quick/Standard mode selection for feature flows
- Three distinct interview flows with tailored questions
- Scope splitting: detect multi-feature requests, propose splits, let user choose focus
- Context gathering: final question for supporting materials in all flows
- Three output formats: Feature PRD, Spike Brief, Tech Debt Brief
- Optional `contextDocs` field in JSON output
- Verify and fix Park & Resume functionality

## Out of Scope

- Claude Code skill version (separate project)
- Enhanced execution loop with progress.md/learned.md (separate project)
- Bug fix workflow
- Fetching or parsing linked documents (v1 stores links only)
- GitHub integration

---

## User Flow

### Landing Page
1. User sees work type selection cards:
   - New Project
   - New Feature
   - Enhancement
   - Spike/Research
   - Tech Debt/Refactor

2. User selects a type

### Mode Selection (Feature Flow Only)
3. If user selected New Project, New Feature, or Enhancement:
   - Show mode selection: Quick or Standard
   - Quick: Faster interview, fewer questions (5-7 min)
   - Standard: Full depth interview (15-20 min)

4. If user selected Spike or Tech Debt:
   - Skip mode selection, proceed to chat

### Interview
5. Chat interface opens with appropriate flow
6. One question at a time, adaptive based on answers
7. If scope too big: Claude proposes split, user confirms
8. If split confirmed: User chooses to detail all or focus on first
9. Final question (all flows): "Do you have any supporting materials? Design docs, wiki links, ADO links?"

### Output
10. PRD/Brief displayed with tabs (Markdown, JSON)
11. Individual download links for each format

---

## Interview Flows

### Flow 1: Feature Flow (New Project, New Feature, Enhancement)

**Phase 1 — Value & Problem**
- What problem are we solving?
- Who experiences this problem?
- What's the current workaround?
- How will we know this is successful?

**Phase 2 — Scope & Boundaries**
- What's the minimum to deliver value?
- What are we NOT building?
- Existing patterns to reuse?
- Hard constraints?

**Phase 3 — User Stories**
- Propose 3-6 stories based on interview
- Each completable in 2-4 hours
- Each with specific acceptance criteria
- User confirms, adjusts, or splits

**Quick Mode Differences:**
- Fewer probing questions in Phase 1 (assume problem is understood)
- Phase 2 focuses on explicit scope boundaries only
- Phase 3 may propose stories earlier with less context

---

### Flow 2: Spike Flow (Spike/Research)

**Phase 1 — Hypothesis**
- What do we believe to be true?
- What are we trying to learn or prove?

**Phase 2 — Questions**
- What specific questions need answers?
- What would change our approach based on findings?

**Phase 3 — Boundaries**
- How long should we spend on this? (time box)
- What artifact proves we learned something?
- What decision will this inform?

---

### Flow 3: Tech Debt Flow (Tech Debt/Refactor)

**Phase 1 — Current State**
- What exists today?
- Why is it a problem? (symptoms, not root cause yet)
- What's the impact of leaving it?

**Phase 2 — Target State**
- What should it look like after?
- What does "done" look like?

**Phase 3 — Migration**
- How do we get there safely?
- Can it be incremental?
- What could break?
- How do we validate it worked?

---

## Scope Splitting Logic

**Detection triggers:**
- Multiple distinct user types with different needs
- "And also" or "while we're at it" language
- More than 5-6 user stories emerging
- Work spans multiple bounded contexts

**When detected:**
1. Claude pauses and says: "This sounds like X separate features: [list]. Should we split this into separate PRDs?"
2. User confirms or adjusts the proposed split
3. User chooses:
   - "Detail all of them now"
   - "Focus on [first one], park the rest"

**Parked items:**
- Captured as lightweight descriptions
- Marked as "Future Phase" in output
- Not fully interviewed, just noted for later

---

## Output Formats

### Feature PRD (Markdown)

```markdown
# [Feature Name]

## Problem Statement
[One paragraph]

## Success Metrics
- [Metric 1]
- [Metric 2]

## Scope
### In Scope
- [Item]

### Out of Scope
- [Item]

## User Stories

### US-001: [Title]
As a [role], I want [capability] so that [benefit].

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

### US-002: [Title]
...

## Technical Notes
[Any technical considerations]

## Open Questions
- [Question]

## Supporting Materials
- [Link to doc]
```

### Feature PRD (JSON)

```json
{
  "type": "feature",
  "project": "ProjectName",
  "branchName": "ralph/feature-name",
  "featureName": "Feature Name",
  "description": "Brief description",
  "problemStatement": "One paragraph",
  "successMetrics": ["Metric 1", "Metric 2"],
  "inScope": ["Item 1"],
  "outOfScope": ["Item 1"],
  "userStories": [
    {
      "id": "US-001",
      "title": "Story title",
      "description": "As a [role], I want [capability] so that [benefit].",
      "acceptanceCriteria": ["Criterion 1", "Criterion 2"],
      "priority": 1
    }
  ],
  "technicalNotes": "Notes",
  "openQuestions": ["Question"],
  "contextDocs": ["https://..."],
  "parkedFeatures": [
    {
      "name": "Future Feature",
      "description": "Brief description for later"
    }
  ]
}
```

### Spike Brief (Markdown)

```markdown
# Spike: [Title]

## Hypothesis
[What we believe / what we're trying to learn]

## Questions to Answer
- [Question 1]
- [Question 2]

## Time Box
[Duration]

## Expected Output
[What artifact will we produce?]

## Decision This Informs
[What will we decide based on findings?]

## Supporting Materials
- [Link]
```

### Spike Brief (JSON)

```json
{
  "type": "spike",
  "title": "Spike Title",
  "hypothesis": "What we believe",
  "questions": ["Question 1", "Question 2"],
  "timeBox": "2 days",
  "expectedOutput": "POC / Recommendation doc / etc",
  "decisionInforms": "What decision this enables",
  "contextDocs": ["https://..."]
}
```

### Tech Debt Brief (Markdown)

```markdown
# Tech Debt: [Title]

## Current State
[What exists today and why it's problematic]

## Target State
[What it should look like after]

## Migration Approach
[How we get there]

### Incremental Steps
1. [Step 1]
2. [Step 2]

## Validation
[How we know it worked]

## Risks
- [What could break]

## Supporting Materials
- [Link]
```

### Tech Debt Brief (JSON)

```json
{
  "type": "techdebt",
  "title": "Tech Debt Title",
  "currentState": "Description of current state",
  "targetState": "Description of target state",
  "migrationApproach": "How to get there",
  "migrationSteps": ["Step 1", "Step 2"],
  "validation": "How we verify success",
  "risks": ["Risk 1"],
  "contextDocs": ["https://..."]
}
```

---

## UI Changes

### Landing Page
- Replace current two-button layout with 5 work type cards
- Each card has: icon, title, brief description
- Cards:
  - **New Project** — "Starting from scratch"
  - **New Feature** — "Adding new capability"
  - **Enhancement** — "Improving existing functionality"
  - **Spike/Research** — "Time-boxed exploration"
  - **Tech Debt** — "Refactor or upgrade"

### Mode Selection Page (New)
- Only shown for New Project, New Feature, Enhancement
- Two cards: Quick and Standard
- Quick: "Faster path for well-understood work (~5 min)"
- Standard: "Full exploration for complex work (~15 min)"

### Chat Page
- No structural changes
- Progress indicator adapts to show correct phases per flow
- Feature flow: Phase 1 (Value) → Phase 2 (Scope) → Phase 3 (Stories)
- Spike flow: Phase 1 (Hypothesis) → Phase 2 (Questions) → Phase 3 (Boundaries)
- Tech debt flow: Phase 1 (Current) → Phase 2 (Target) → Phase 3 (Migration)

### Output Page
- Tabs remain: Markdown | JSON
- Download links remain individual files
- Content adapts to output type (PRD, Spike Brief, Tech Debt Brief)

---

## Technical Notes

### New System Prompts Required
1. **Feature Flow (Standard)** — Enhance existing prompt
2. **Feature Flow (Quick)** — New prompt, fewer questions
3. **Spike Flow** — New prompt for hypothesis/questions/timebox
4. **Tech Debt Flow** — New prompt for current/target/migration

### State Management
- Add `workType` to session state
- Add `interviewMode` to session state (quick/standard)
- Phase names vary by flow — update ProgressIndicator to handle this

### API Changes
- `/api/chat` needs to accept `workType` and `interviewMode`
- Response format unchanged, but PRD structure varies by type

### Existing Code Reuse
- Chat interface components (ChatMessage, ChatInput) — reuse as-is
- OutputTabs, MarkdownPreview — reuse, adapt content
- Session storage pattern — extend for new state
- Park & Resume — verify functionality, fix if broken

---

## User Stories

### US-001: Select work type on landing page
As a user, I want to select what type of work I'm defining so that I get an interview tailored to my needs.

**Acceptance Criteria:**
- [ ] Landing page displays 5 work type cards
- [ ] Each card has title, description, and visual distinction
- [ ] Clicking a card advances to next step
- [ ] Selected type is stored in session state

### US-002: Select interview mode for feature flows
As a user defining a feature, I want to choose between Quick and Standard modes so that I can match the depth to my needs.

**Acceptance Criteria:**
- [ ] Mode selection page only appears for New Project, New Feature, Enhancement
- [ ] Spike and Tech Debt skip directly to chat
- [ ] Two clear options with descriptions of what to expect
- [ ] Selected mode is stored in session state

### US-003: Complete a Quick mode feature interview
As a user with well-understood work, I want a faster interview so that I can get to a PRD in under 7 minutes.

**Acceptance Criteria:**
- [ ] Quick mode uses a streamlined prompt with fewer probing questions
- [ ] Phase transitions still occur and are indicated
- [ ] Output format is identical to Standard mode
- [ ] Interview completes faster while still capturing essentials

### US-004: Complete a Spike interview flow
As a user planning research work, I want to define a hypothesis and questions so that my spike has clear boundaries.

**Acceptance Criteria:**
- [ ] Spike flow asks about hypothesis, questions, time box, expected output
- [ ] Does not ask about user stories or acceptance criteria
- [ ] Progress indicator shows Spike-specific phases
- [ ] Output is a Spike Brief (markdown + JSON)

### US-005: Complete a Tech Debt interview flow
As a user planning refactoring work, I want to define current state, target state, and migration so that the work is well-scoped.

**Acceptance Criteria:**
- [ ] Tech debt flow asks about current state, target state, migration, validation
- [ ] Does not ask about user stories
- [ ] Progress indicator shows Tech Debt-specific phases
- [ ] Output is a Tech Debt Brief (markdown + JSON)

### US-006: Claude detects and proposes scope splits
As a user describing large work, I want Claude to identify when it's multiple features so that I don't create an unmanageable PRD.

**Acceptance Criteria:**
- [ ] Claude recognizes multi-feature signals during interview
- [ ] Claude pauses and proposes a split with clear descriptions
- [ ] User can confirm, adjust, or reject the split
- [ ] If confirmed, user chooses to detail all or focus on first

### US-007: Park unselected features as future phases
As a user who chose to focus on one feature, I want the others captured for later so that I don't lose the context.

**Acceptance Criteria:**
- [ ] Parked features appear in output as "Future Phases"
- [ ] Each has a brief description (not full PRD)
- [ ] JSON output includes `parkedFeatures` array

### US-008: Capture supporting materials
As a user, I want to link to design docs or wiki pages so that Claude Code has context when executing.

**Acceptance Criteria:**
- [ ] Final question in all flows asks about supporting materials
- [ ] Links are stored in output (markdown and JSON)
- [ ] Field is optional — no links is valid
- [ ] JSON includes `contextDocs` array

### US-009: Verify and fix Park & Resume
As a user, I want to pause and resume my interview later so that I can work in multiple sessions.

**Acceptance Criteria:**
- [ ] Park button generates downloadable state file
- [ ] Resume accepts uploaded state file
- [ ] Interview continues from correct phase
- [ ] Works for all three interview flows

---

## Open Questions

1. Should Quick mode have a different visual indicator in the output (e.g., "Quick PRD" label) so reviewers know the depth of interview?
2. For scope splits, should we limit how many features can be parked? (e.g., max 5?)
3. Should the landing page have a "not sure" option that asks a clarifying question to help classify?

---

## Dependencies

None — this is an enhancement to an existing standalone application.

## Future Iterations

- Claude Code skill version with codebase awareness
- Enhanced execution loop (progress.md, learned.md)
- Fetching and parsing linked documents during interview
- GitHub repository integration for context

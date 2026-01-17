# Ralph PRD Generator Help

Welcome to the Ralph PRD Generator. This guide will help you understand how to use the tool effectively.

---

## Work Types

Choose the work type that best matches what you're trying to document:

### New Project
**Use when:** Starting a completely new product, application, or system from scratch.

**Conversation style:** Ralph will guide you through establishing the project's core value proposition, defining its scope, and breaking down the initial feature set into user stories. Expect questions about target users, business goals, and success criteria.

### New Feature
**Use when:** Adding significant new functionality to an existing product.

**Conversation style:** Ralph will explore the problem you're solving, who benefits, and how this feature fits into the existing product. You'll define clear boundaries and create prioritized user stories with acceptance criteria.

### Enhancement
**Use when:** Improving or extending existing functionality.

**Conversation style:** Ralph will ask about current limitations, what improvement you want to see, and how users will benefit. The scope discussion focuses on what changes vs. what stays the same.

### Spike
**Use when:** You need to research or investigate something before committing to implementation.

**Conversation style:** Ralph helps you articulate a clear hypothesis, define the questions you need answered, and set time boundaries for your investigation. The output is a research brief, not a PRD.

### Tech Debt
**Use when:** Documenting technical migrations, refactoring, or infrastructure improvements.

**Conversation style:** Ralph will guide you through describing the current state, defining the target state, and planning the migration approach. Focus is on technical accuracy and risk identification.

### Bug Report
**Use when:** Documenting a bug that needs to be fixed.

**Conversation style:** Ralph conducts a three-phase interview: first establishing what's broken, then gathering evidence (URLs, stack traces, screenshots), and finally clarifying expected vs. actual behavior.

---

## Conversation Modes

For Project, Feature, and Enhancement work types, you'll choose a conversation mode:

### Standard Mode
**Best for:** First-time users, complex features, or when you want thorough documentation.

**What to expect:** Ralph asks more questions and explores edge cases. This results in more comprehensive PRDs with detailed acceptance criteria. The conversation takes longer but produces more complete documentation.

### Quick Mode
**Best for:** Experienced users, simple features, or when you already have clear requirements.

**What to expect:** Ralph asks fewer questions and moves faster through the phases. You'll get a complete PRD, but with less back-and-forth exploration. Ideal when you know exactly what you want.

---

## Park & Resume

Need to step away? You can save your progress and continue later.

### How to Park Your Work

1. Click the **Home** button in the navigation bar during a conversation
2. A dialog appears asking if you want to save your progress
3. Click **Park & Download** to save your session
4. A JSON file downloads to your computer containing your entire conversation
5. You can now safely close the browser or start a new conversation

### How to Resume Parked Work

1. From the home page, click **Resume Parked Conversation**
2. Select the parked session file from your computer
3. Your conversation loads exactly where you left off
4. Continue the conversation as normal

### What Gets Saved

- Your selected work type and mode
- All messages in the conversation
- Current conversation phase
- Everything needed to pick up where you left off

---

## Understanding Your Output

When your conversation completes, you'll receive two formats of output:

### Markdown Output

**Purpose:** Human-readable documentation for sharing and collaboration.

**Use it for:**
- Uploading to SharePoint or Confluence
- Adding to GitHub as project documentation
- Sharing with stakeholders who need to review requirements
- Storing in your team's documentation system

**How to save:** Click the **Copy** button to copy to clipboard, or click **Download** to save as a `.md` file.

### JSON Output

**Purpose:** Machine-readable format for use with Claude Code.

**Use it for:**
- Feeding directly to Claude Code for implementation
- Importing into project management tools
- Automated processing or integration
- Version-controlled requirements alongside code

**How to save:** Click the **Copy** button to copy to clipboard, or click **Download** to save as a `.json` file.

### Recommended Workflow

1. **Download both formats** when your PRD is complete
2. **Store the Markdown** in your team's documentation system
3. **Use the JSON** when you're ready to start implementation with Claude Code
4. **Keep the JSON file** with your project for future reference

---

## Tips for Best Results

- **Be specific** when answering questions - vague answers lead to vague PRDs
- **Don't skip context** - if Ralph asks about related systems or dependencies, provide details
- **Review user stories carefully** - these become the implementation checklist
- **Use the standard mode** your first few times to learn what makes a complete PRD
- **Park complex conversations** rather than rushing through them

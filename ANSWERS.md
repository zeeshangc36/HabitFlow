# ANSWERS.md

## 1. How to run

### Requirements
- A modern web browser (Chrome, Edge, Firefox, Safari)
- No build tools, frameworks, or dependencies required

### Steps to run locally
1. Download or clone the repository
2. Open the project folder
3. Open `index.html` directly in the browser

### Optional (recommended) local server

If you prefer a local server environment:

#### Using VS Code Live Server
- Right-click `index.html`
- Select **“Open with Live Server”**


### Deployment

No external deployment is required. The project runs fully in the browser.

---

## 2. Stack & design choices

### Frontend stack

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* LocalStorage API for persistence

I chose this stack because the project is heavily interaction-driven rather than framework-dependent. Using vanilla JavaScript keeps the app lightweight, fast, and easy to run without any setup or build tools. It also gives full control over DOM interactions, which is important for a highly dynamic UI like a habit tracker.

LocalStorage was used to keep the app fully client-side while still allowing persistence across refreshes.

---

### Design decision 1: Weekly grid system

I chose a **grid-based weekly tracker (habits × 7 days)** instead of a vertical list because habit tracking is fundamentally about visualizing consistency over time.

This layout allows users to:

* Instantly see streak patterns
* Identify missed days at a glance
* Compare multiple habits across the same timeline

This improves readability and makes behavioral patterns easier to understand compared to a simple list UI.

This design directly affects:

* Tracker layout structure
* Habit row rendering
* User interaction flow for marking completion

---

### Design decision 2: Highlighting the current day column

I highlighted the current day column with a soft background color to anchor user attention.

This reduces cognitive load by:

* Helping users immediately locate “today”
* Making daily interaction faster and more intuitive
* Preventing date confusion in weekly navigation

This affects:

* Tracker header UI
* Daily interaction focus
* Mobile usability where space is limited

---

## 3. Responsive & accessibility

### Responsive behavior

#### Mobile (≈360px width)

* Sidebar collapses into a hamburger menu
* Dashboard header is replaced with a compact topbar
* Stats stack vertically (single column)
* Widgets become single-column layout
* Tracker becomes horizontally scrollable for usability

#### Desktop (≈1440px width)

* Full sidebar remains visible
* Multi-column dashboard layout is enabled
* Widgets are displayed in a row-based grid
* Full spacing hierarchy improves readability

---

### Accessibility considerations implemented

* High contrast between text and background
* Large clickable areas for buttons and checkmarks
* Hover states for interactive elements
* Semantic HTML usage (buttons instead of clickable divs)
* Clear visual hierarchy for readability

---

### Accessibility limitation (known gap)

Not fully implemented due to scope/time:

* Full keyboard navigation (tab flow across grid)
* ARIA roles and labels for screen readers
* Focus trapping inside modal dialogs

These would be improvements for a production-grade accessibility audit.

---

## 4. AI usage

### AI tool used

* ChatGPT (for UI/UX design, logic, and debugging assistance)

---

### Where AI was used

#### UI structure

* Generated initial dashboard layout structure
* Helped design sidebar, stats, tracker, and modal system

#### CSS design system

* Assisted in creating responsive layout system
* Helped define spacing, grid system, and visual hierarchy
* Improved consistency of styling variables

#### JavaScript logic

* Assisted in building:

  * LocalStorage persistence
  * Week navigation system
  * Habit CRUD (create, edit, delete)
  * Streak calculation logic
  * Completion percentage logic
  * Icon library system

---

### Example of modification to AI output

One key correction was the **completion calculation logic**.

The initial implementation calculated completion based on total historical log entries, which caused inaccurate results (e.g., showing 100% from a single entry).

I modified it to:

* only consider the current visible week
* calculate completion as:
  `completed checks / (habits × 7 days)`

This made the widget context-aware and visually meaningful.

---

## 5. Honest gap

One area that is still not fully polished is the icon system and deep accessibility support.

### Current limitation:

* Icon library works functionally but lacks advanced UX refinement
* No keyboard navigation inside icon picker
* Limited visual feedback improvements for selected state transitions

### If I had another day, I would improve:

* Full keyboard navigation for icon selection
* Better focus management inside modal + icon library
* Improved ARIA labeling across all interactive elements
* Drag-and-drop habit reordering
* Smoother micro-interactions and animations for state changes

---

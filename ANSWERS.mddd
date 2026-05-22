# ANSWERS.md

## 1. How to run

### Requirements
- A modern browser (Chrome, Edge, Firefox, Safari)
- No build tools or package installation required

### Run locally
1. Download or clone the repository
2. Open the project folder
3. Open `index.html` in the browser

Or use a local development server:

```bash
# VS Code Live Server
Right click index.html → Open with Live Server



## Deployment

No external deployment is required.

The project runs fully in the browser by opening `index.html`.



## Design / interaction decision #1  
### Weekly grid instead of list-based tracking

The app uses a horizontal weekly grid with:

- habits vertically  
- days horizontally  

This decision was made because habit tracking is highly pattern-oriented. A grid allows users to understand consistency instantly through visual scanning. Users can identify streaks, missed days, and momentum much faster compared to a traditional vertical list layout.

### This affects:
- the tracker section  
- streak visibility  
- weekly completion understanding  

---

## Design / interaction decision #2  
### Highlighting today's column

The current day column is visually highlighted using a soft green background.

This was done to reduce cognitive load and anchor the user's attention immediately to “today,” which is the most actionable part of the interface.

Without this, users must mentally map dates every time they open the app.

### This affects:
- tracker header  
- habit check interaction flow  
- mobile usability  


## 3. Responsive & accessibility

### Responsive behavior

#### Mobile (≈360px width)
- Sidebar collapses into a hamburger menu  
- Dashboard header is replaced with a compact topbar  
- Stats stack vertically (single column)  
- Widgets become single-column layout  
- Tracker becomes horizontally scrollable for usability  

#### Desktop (≈1440px width)
- Full sidebar remains visible  
- Multi-column dashboard layout is enabled  
- Widgets are displayed in a row-based grid  
- Full spacing hierarchy improves readability  

---

### Accessibility considerations implemented
- High contrast between text and background  
- Large clickable areas for buttons and checkmarks  
- Hover states for interactive elements  
- Semantic HTML usage (buttons instead of clickable divs)  
- Clear visual hierarchy for readability  

---

### Accessibility limitation (known gap)

Not fully implemented due to scope/time:

- Full keyboard navigation (tab flow across grid)  
- ARIA roles and labels for screen readers  
- Focus trapping inside modal dialogs  

These would be improvements for a production-grade accessibility audit.

---

## 4. AI usage

### AI tool used
- ChatGPT (for UI/UX design, logic, and debugging assistance)

---

### Where AI was used

#### UI structure
- Generated initial dashboard layout structure  
- Helped design sidebar, stats, tracker, and modal system  

#### CSS design system
- Assisted in creating responsive layout system  
- Helped define spacing, grid system, and visual hierarchy  
- Improved consistency of styling variables  

#### JavaScript logic
- Assisted in building:
  - LocalStorage persistence  
  - Week navigation system  
  - Habit CRUD (create, edit, delete)  
  - Streak calculation logic  
  - Completion percentage logic  
  - Icon library system  

---

### Example of modification to AI output

One key correction was the completion calculation logic.

The initial implementation calculated completion based on total historical log entries, which caused inaccurate results (e.g., showing 100% from a single entry).

I modified it to:

- only consider the current visible week  
- calculate completion as:  
  `completed checks / (habits × 7 days)`

This made the widget context-aware and visually meaningful  

---

## 5. Honest gap

One area that is still not fully polished is the icon system and deep accessibility support.

### Current limitation:
- Icon library works functionally but lacks advanced UX refinement  
- No keyboard navigation inside icon picker  
- Limited visual feedback improvements for selected state transitions  

### If I had another day, I would improve:
- Full keyboard navigation for icon selection  
- Better focus management inside modal + icon library  
- Improved ARIA labeling across all interactive elements  
- Drag-and-drop habit reordering  
- Smoother micro-interactions and animations for state changes  









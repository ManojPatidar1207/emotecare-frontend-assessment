# emote Care Front-End Engineer Assessment

A single-page calendar application built with modern React tooling.

---

## Setup & Installation.

Please follow below steps to setup and run on local machine:

> ## Prerequisites
>
> To run this project, please make sure the following are installed:
>
> - **Node.js**: `>= 18.x`
> - **pnpm**: `>= 8.x`
>
> Install `pnpm` globally:
>
> ```bash
> npm install -g pnpm
> ```
>
> ✅ Verify versions:
>
> ```bash
> node -v
> pnpm -v
> ```

1. Clone the repository:

   ```bash
   git clone https://github.com/ManojPatidar1207/emotecare-frontend-assessment.git
   cd emotecare-frontend-assessment
   ```

2. Install dependencies with `pnpm`:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and go to `http://localhost:5173`

You’re all set — the calendar interface should be visible in your browser.

---

## Tech Stacks & Why I Chose It

An overview of the stack, design rationale, and comparable technologies.

---

### Core Stack

**React + Vite**

- **_Why:_** React + Vite offers lightning-fast dev server startup and optimized builds
- **_Alternative:_** **Next.js** — powerful for full-stack apps but introduces SSR, so as in the assessment requirements, we need to create a SPA and we don't need SSR at the first place.

**Tailwind CSS**

- **_Why:_** I chose Tailwind CSS because it makes building UIs faster and more consistent. Its utility-first approach keeps styles inline, which means less context-switching and more focus. Tailwind also made it super easy to support dark mode, responsive layouts, and a clean design system—all without adding runtime overhead like CSS-in-JS solutions.

**FullCalendar**

- **_Why:_** Since the assessment is **time-boxed** and the goal is to replicate **Google Calendar-like UI and experience**, I chose **FullCalendar** because it offers powerful built-in views, solid performance, and great customization capabilities out of the box. It allowed me to focus more on feature-building rather than reinventing grid systems or handling complex date logic manually.

  Compared to alternatives like `react-big-calendar`, **FullCalendar is faster, has a smaller install size**, and provides more control over UI and interactions—which aligned well with the polished UX requirement.

  I'd opt for a **manual implementation** only if the product heavily revolves around a calendar as its core feature and demands **pixel-perfect control** over every calendar element. In such cases, investing time into a custom solution would make sense.

**ShadCN UI**

- **_Why:_** I picked **shadcn** for its clean, accessible components built with **Tailwind CSS** and **Radix UI**. It’s fast to customize, fits well with selected stack

  I'd consider alternatives only if the project had unique design requirements that needed highly tailored UI systems from scratch or if we needed a large design system out of the box.

**Zustand (State Management)**

- **_Why:_** I picked **Zustand** because it’s minimal, fast, and scales well without boilerplate. It’s easier to manage, **avoids unnecessary re-renders** and works well with async logic and complex states.

**React Hook Form + Zod**

- **_Why:_** I chose **React Hook Form** with **Zod** for their great TypeScript support, better performance, and minimal re-renders. While **Formik + Yup** is also a solid choice, RHF feels more lightweight and flexible—especially in dynamic forms. It allowed to build fast, type-safe forms with smooth validation.

**React Query**

- **_Why:_** I went with **React Query** for its robust features like caching, pagination, background refetching. While **SWR** is great for simplicity and lightweight fetch logic, React Query offered more control and flexibility, which was better suited for managing calendar data and user interactions in this project.

---

## Architecture & Design Overview

Built for clarity and performance, here I uses a modular approach - making it easy to understand, maintain, and scale over time.

### Component Structure Overview

This is a visual breakdown of how the app is organized at a high level:

```
App (root)
│
├── src
│   │── components # Core and reusable components
│   │    ├── ui # shadcn components
│   │    └── react-hook-form # RHF input components
│   │
│   │── domains # domains related stuff like, auth, calendar
│   │    └── calendar # domain
│   │        ├── api
│   │        ├── components
│   │        │   └── tests
│   │        ├── constants
│   │        ├── hooks
│   │        ├── regex
│   │        ├── store
│   │        ├── styles
│   │        ├── types
│   │        ├── utils
│   │        │   └── tests
│   │        └── validations
│   │
│   │── hooks # common and shared hooks for entire project
│   │── utils # common and shared utils for entire project
```

### 🔍 Highlights

- **Views**: Handle different calendar modes (month, week, day).
- **Calendar Layer**: Central logic for FullCalendar setup, view switching, navigation, and event rendering.
- **Forms**: Managed with React Hook Form and validated using Zod for safety and performance.
- **UI Components**: Built using ShadCN primitives and styled via Tailwind for consistent, accessible design.
- **Global State**: Zustands keeps track of UI state like selected view and active events.
- **Testing**: Used `vitest` with React testing library

### State Management

- **Zustand** is used for managing global app state — such as selected dates, current view (month/week/day), and event data.
- This keeps the app lightweight and avoids over-complicating things with Redux or prop-drilling.

### Data Handling

- While currenlty, uses local mock data, **React Query** is set up to prepare for API interactions and fetching mock events.
- It would handle caching, loading states, and background updates seamlessly when needed.

### Design Goals

- **Separation of concerns** — UI, state, and logic are kept in their own spaces.
- **Reusability** — components are written generically to be reused across views.
- **Scalability** — the codebase is small now, but easy to grow.

---

## Known Issues, Limitations, and Assumptions

Some features are simplified or limited for this timed-box assessment

### Responsiveness

- The project is optimized for PC/laptop use. While it’s partially responsive, it does not provide full mobile support, and the UI may break or feel limited on smaller devices.

- When we have more events in a day, then it shows "more" button and when we click on this button, it shows all events in the popup. Now when we click on some event from popup and click anywhere in the UI, it will close more events popup. (This can be fixed by implementing custom more event popup).

## Bonus Features Implemented

- Basic Accessibility (WCAG AA)

- Unit Tests for some components and utils

- React Query used for mock JSON fetching

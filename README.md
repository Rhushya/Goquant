# Goquant QA Assignment

This repository contains a complete QA assignment environment that pairs a Next.js 14 frontend with a FastAPI backend and an automated Playwright test suite. The goal of this README is to consolidate the information that was previously spread across multiple guides so you can rely on a single document for setup, execution, customization, and submission.

## Table of Contents
- Overview
- Tech Stack and Highlights
- Project Structure
- Environment Setup
- Running the Applications
- Automated and Manual Testing
- API Surface
- Customization Checklist
- Documentation Assets
- Submission Guidelines
- Troubleshooting
- Learning Resources

## Overview
- Production-ready sample focused on QA workflows (manual + automated)
- Includes seed data, authentication flows, and UI states suitable for test design
- Ships with Playwright E2E coverage across seven authentication scenarios
- Documentation templates for manual test cases, bug reports, methodology, and executive summary

## Tech Stack and Highlights
- Frontend: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui components
- Backend: FastAPI, Pydantic, Uvicorn
- Testing: Playwright (TS) with Page Object Model + Pytest placeholder for backend
- Tooling: ESLint, Prettier, Vite-style dev experience, npm scripts for automation
- Target runtimes: Node 18+, Python 3.10+

## Project Structure
```
QA-Assignment/
|-- frontend/                # Next.js app, Playwright tests, UI components
|   |-- src/app/             # Root layout, dashboard, shared UI
|   |-- src/pages/           # Manual tests and bug reports pages
|   |-- tests/pages/         # Playwright page objects
|   |-- tests/specs/         # Playwright specs (auth focus + extendable)
|   |-- package.json         # Scripts and dependencies
|
|-- backend/                 # FastAPI application
|   |-- app/main.py          # FastAPI entrypoint and router registration
|   |-- app/routers/         # Auth, products, and bug endpoints
|   |-- app/schemas.py       # Pydantic DTOs
|   |-- requirements.txt     # Python dependencies
|
|-- docs/                    # Manual QA deliverables (templates)
|   |-- Manual_Test_Cases.md
|   |-- Bug_Report_Template.md
|   |-- Methodology.md
|   |-- Executive_Summary.md
|
|-- QUICK_START.md           # Short-form summary (icons removed)
|-- complete-README.md       # Long-form reference
|-- IMPLEMENTATION_GUIDE.md  # Step-by-step walkthrough
|-- FILE_INDEX.md            # File inventory
```

## Environment Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm (bundled with Node)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev # http://localhost:3000
```

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload # http://localhost:8000
```

## Running the Applications
- Start the backend first so API calls succeed (`uvicorn app.main:app --reload`).
- Launch the frontend with `npm run dev` and navigate to http://localhost:3000.
- API docs live at http://localhost:8000/docs for quick contract validation.

## Automated and Manual Testing

### Playwright (frontend)
```bash
cd frontend
npm run test       # Headless
npm run test:ui    # Interactive mode
npm run test:headed
npm run test:debug
npm run codegen    # Record interactions
```

### Backend tests
- Placeholder `backend/tests` folder is provided for Pytest suites (`pytest tests/`).

### Manual QA assets
- Add 10-15 manual cases in `frontend/src/pages/manual-tests.tsx`.
- Capture at least three reproducible bugs in `frontend/src/pages/bug-reports.tsx` with severity, steps, expected vs actual, and artifacts.
- Complement with documentation templates in `docs/` (Methodology, Executive Summary, etc.).

## API Surface

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Products
- `GET /api/v1/products`
- `GET /api/v1/products/{id}`
- `POST /api/v1/products`
- `PUT /api/v1/products/{id}`
- `DELETE /api/v1/products/{id}`
- `GET /api/v1/products/search`

### Bugs
- `GET /api/v1/bugs`
- `POST /api/v1/bugs`
- `GET /api/v1/bugs/{id}`
- `PUT /api/v1/bugs/{id}/status`
- `GET /api/v1/bugs/severity/{severity}`

## Customization Checklist
- [ ] Install dependencies and confirm both services run locally
- [ ] Populate `manual-tests.tsx` with your curated cases
- [ ] Log at least three bugs in `bug-reports.tsx` plus screenshots
- [ ] Extend Playwright specs beyond authentication (products, cart, etc.)
- [ ] Complete docs in `docs/` (Methodology, Executive Summary, Test Results)
- [ ] Record a 5-10 minute walkthrough video (manual + automation + architecture)
- [ ] Generate HTML/Playwright reports and include in submission package

## Documentation Assets
- `QUICK_START.md`: five-minute overview
- `complete-README.md`: exhaustive breakdown (8k+ words)
- `IMPLEMENTATION_GUIDE.md`: step-by-step instructions and troubleshooting
- `FILE_INDEX.md`: file-by-file reference with context and statistics
- `docs/*.md`: templates for test cases, bug reports, methodology, executive summary, tool stack, and demo instructions

## Submission Guidelines
- Verify no secrets remain in `.env` files before packaging
- Zip the entire workspace, include documentation PDFs, reports, and demo video (<=100 MB)
- Email to `careers@goquant.io` with subject `QA Engineer Assignment Submission [Your Name]`
- CC `himanshu.vairagade@goquant.io`
- Include in the email: approach summary, key findings, run instructions, assumptions, and limitations

## Troubleshooting
- Port conflicts: run frontend with `npm run dev -- -p 3001` or backend with `uvicorn app.main:app --port 8001`
- Playwright browsers missing: `npx playwright install`
- Python dependency failures: recreate the virtual environment and reinstall requirements

## Learning Resources
- [Playwright Documentation](https://playwright.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Learn](https://nextjs.org/learn)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)


## DEMO

https://github.com/user-attachments/assets/775d25f5-4ac6-43c5-84a8-186be291f7f1


---
This single README now captures the essential information needed to set up, customize, test, and submit the Goquant QA assignment. Refer to the longer guides only when deeper detail is required.

# QA Assignment - Complete Project Documentation

## Project Overview

This is a **comprehensive QA Engineering assignment** testing a deliberately buggy e-commerce application at `https://buggy.justtestit.org/`. The project includes:

- ✅ **Manual Test Cases** (10-15 detailed test scenarios)
- ✅ **Bug Reports** (5+ identified issues with severity levels)
- ✅ **Automated E2E Tests** (Playwright with Page Object Model)
- ✅ **Backend API** (FastAPI for mock data and testing endpoints)
- ✅ **Frontend Portal** (Next.js + SADCN UI for documentation)
- ✅ **Complete Documentation** (Methodology, Executive Summary, Tools Used)

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **UI Library**: SADCN (Shadcn/ui components) + Tailwind CSS
- **Automation**: Playwright (E2E testing with POM)
- **Language**: TypeScript

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **ORM**: SQLAlchemy (with mock in-memory DB)
- **Auth**: JWT + Passlib
- **API Documentation**: Auto-generated Swagger/OpenAPI

### DevOps & Testing
- **E2E Framework**: Playwright
- **Unit Testing**: Pytest
- **CI/CD Ready**: GitHub Actions compatible

---

## Project Structure

```
QA-Assignment/
├── frontend/                          # Next.js + SADCN
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            # Root layout with navigation
│   │   │   ├── globals.css           # Tailwind styles
│   │   │   └── page.tsx              # Dashboard home
│   │   ├── pages/
│   │   │   ├── manual-tests.tsx      # Test cases table
│   │   │   ├── bug-reports.tsx       # Bug report details
│   │   │   └── automation-suite.tsx  # Automation info
│   │   ├── components/
│   │   │   ├── TestCaseTable.tsx
│   │   │   ├── BugReportForm.tsx
│   │   │   ├── TestResultCard.tsx
│   │   │   └── ui/                  # SADCN components
│   │   ├── lib/
│   │   │   ├── api-client.ts        # Axios instance
│   │   │   └── constants.ts
│   │   └── tests/                   # Playwright E2E
│   │       ├── pages/               # Page objects
│   │       │   ├── BasePage.ts
│   │       │   ├── LoginPage.ts
│   │       │   ├── ProductPage.ts
│   │       │   └── CartPage.ts
│   │       └── specs/               # Test specs
│   │           ├── auth.spec.ts
│   │           ├── products.spec.ts
│   │           ├── cart-checkout.spec.ts
│   │           └── form-validation.spec.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── playwright.config.ts
│   └── README.md
│
├── backend/                           # FastAPI
│   ├── app/
│   │   ├── main.py                  # FastAPI app + routes
│   │   ├── config.py                # Settings & environment
│   │   ├── schemas.py               # Pydantic models
│   │   ├── db.py                    # Database setup
│   │   ├── routers/
│   │   │   ├── auth.py              # /api/v1/auth
│   │   │   ├── products.py          # /api/v1/products
│   │   │   └── bugs.py              # /api/v1/bugs
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   └── bug.py
│   │   └── utils.py
│   ├── tests/
│   │   ├── test_auth_api.py
│   │   ├── test_products_api.py
│   │   └── test_bugs_api.py
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── .env
│   └── README.md
│
├── docs/
│   ├── Manual_Test_Cases.md          # 10-15 test cases
│   ├── Bug_Report_Template.md        # Bug documentation
│   ├── Methodology.md                # Testing approach
│   ├── Executive_Summary.md          # 1-2 page overview
│   ├── Tools_List.md                 # Tools & versions
│   └── Demo_Instructions.md          # Video demo guide
│
├── README.md                          # Main project README
└── .env.example                       # Environment template
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ (Frontend)
- Python 3.10+ (Backend)
- npm or yarn (Frontend package manager)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Install SADCN components (if needed)
npx shadcn-ui@latest init

# Run development server
npm run dev

# Run Playwright tests
npm run test

# Run tests with UI
npm run test:ui

# Generate test code from browser
npm run codegen
```

**Frontend runs on**: `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
python -m uvicorn app.main:app --reload

# Run API tests
pytest tests/
```

**Backend API runs on**: `http://localhost:8000`
**Swagger UI**: `http://localhost:8000/docs`
**ReDoc**: `http://localhost:8000/redoc`

---

## Manual Test Cases Summary

### Test Areas Covered
1. **User Registration** - Valid/invalid credentials
2. **Authentication** - Login, logout, session management
3. **Product Browsing** - List, search, filter
4. **Shopping Cart** - Add, remove, update quantities
5. **Checkout Process** - Payment, shipping, order confirmation
6. **Form Validation** - Empty fields, invalid formats
7. **Cross-browser** - Chrome, Firefox, Safari
8. **Responsive Design** - Mobile, tablet, desktop
9. **Performance** - Page load times, API response
10. **Security** - SQL injection, XSS attempts

### Test Case Format
Each test case includes:
- **Test ID**: Unique identifier (TC-001, TC-002, etc.)
- **Scenario**: Clear description of what's being tested
- **Priority**: High/Medium/Low
- **Preconditions**: Setup requirements
- **Test Steps**: Detailed action sequence
- **Expected Result**: Successful outcome
- **Actual Result**: What was observed
- **Pass/Fail**: Test status

---

## Bug Reports Summary

### Identified Bugs

| Bug ID | Severity | Type | Status |
|--------|----------|------|--------|
| BUG-001 | Critical | Functional | Open |
| BUG-002 | High | Functional | Open |
| BUG-003 | Critical | Security | Open |
| BUG-004 | Medium | Validation | Open |
| BUG-005 | High | Performance | Open |

### Bug Report Format
Each bug includes:
- **Title**: Clear summary
- **Severity**: Critical/High/Medium/Low
- **Type**: Functional/Security/Performance/Validation/UI
- **Reproduction Steps**: 1-10 numbered steps
- **Expected Behavior**: How it should work
- **Actual Behavior**: What's broken
- **Root Cause Analysis**: Why it happened
- **Suggested Fix**: Solution approach
- **Environment**: Browser, OS, version

---

## Automated Testing (Playwright)

### Test Suite Features
- ✅ **Page Object Model (POM)**: Maintainable, reusable page objects
- ✅ **Cross-browser**: Chrome, Firefox, Safari, Mobile
- ✅ **Fixtures & Hooks**: Setup/teardown for each test
- ✅ **Screenshots**: Captured on failure
- ✅ **Video Recording**: Retained on failure
- ✅ **Parallel Execution**: Multiple tests simultaneously
- ✅ **Multiple Reporters**: HTML, JSON, JUnit XML
- ✅ **Assertions**: Comprehensive validation
- ✅ **API Testing**: Mocked endpoints

### Test Specs
1. **auth.spec.ts** - Login, registration, sessions
2. **products.spec.ts** - Search, filter, pagination
3. **cart-checkout.spec.ts** - Add to cart, checkout flow
4. **form-validation.spec.ts** - Input validation, error messages

### Run Playwright Tests

```bash
cd frontend

# Run all tests headless
npm run test

# Run with UI (interactive)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/specs/auth.spec.ts

# Run specific test
npx playwright test -g "Login with valid credentials"

# Generate test code
npm run codegen  # Opens browser for recording
```

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get token
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Products
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/{id}` - Get product details
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/{id}` - Update product
- `DELETE /api/v1/products/{id}` - Delete product
- `GET /api/v1/products/search` - Search products
- `GET /api/v1/products/category/{category}` - Filter by category

### Bug Reports
- `GET /api/v1/bugs` - List all bugs
- `GET /api/v1/bugs/{id}` - Get bug details
- `POST /api/v1/bugs` - Create bug report
- `PUT /api/v1/bugs/{id}/status` - Update bug status
- `GET /api/v1/bugs/severity/{severity}` - Filter by severity
- `DELETE /api/v1/bugs/{id}` - Delete bug
- `GET /api/v1/bugs/stats/summary` - Get statistics

### Health & Metrics
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/v1/metrics` - API metrics

---

## Testing Methodology

### Test Execution Flow
1. **Preparation** - Clear cache, fresh environment
2. **Manual Testing** - Execute test cases manually, document results
3. **Bug Identification** - Log issues with evidence
4. **Automation** - Code E2E tests for critical flows
5. **Regression** - Run automation suite after fixes
6. **Reporting** - Compile all findings

### Severity Levels
- **Critical**: Blocks app usage, security risk, data loss
- **High**: Major feature broken, significant user impact
- **Medium**: Feature works but with issues, workaround exists
- **Low**: Minor UI issues, cosmetic problems

### Priority Levels
- **High**: Fix immediately before release
- **Medium**: Fix in current/next sprint
- **Low**: Fix when time permits, non-blocking

---

## Tools Used

### Frontend Tools
- **IDE**: VS Code
- **Build**: Next.js with SWC
- **Styling**: Tailwind CSS v3.4
- **UI Components**: SADCN (Shadcn/ui)
- **Testing**: Playwright v1.40
- **Type Safety**: TypeScript v5.3
- **Code Quality**: ESLint, Prettier

### Backend Tools
- **Framework**: FastAPI v0.104
- **Web Server**: Uvicorn
- **API Docs**: Swagger UI, ReDoc
- **Testing**: Pytest, Pytest-asyncio
- **Database**: SQLAlchemy + SQLite
- **Auth**: JWT, Passlib

### QA Tools
- **Browser DevTools**: Chrome DevTools, Firefox Inspector
- **Network**: Postman, Insomnia (API testing)
- **Performance**: Lighthouse, PageSpeed Insights
- **Screenshots**: Playwright screenshots, ShareX
- **Screen Recording**: OBS, Camtasia
- **Version Control**: Git, GitHub

---

## Submission Checklist

- [ ] All manual test cases documented (10-15 cases)
- [ ] Bug reports completed (3+ bugs, detailed reproduction)
- [ ] Playwright test suite written (4+ spec files)
- [ ] All tests passing in CI environment
- [ ] FastAPI backend functional with mock data
- [ ] Frontend portal working with all pages
- [ ] Screenshots/evidence for each bug
- [ ] Test documentation as PDF
- [ ] Demo video recorded (5-10 minutes)
- [ ] Executive summary written (1-2 pages)
- [ ] README with setup instructions
- [ ] All code commented and organized
- [ ] Confidentiality maintained (NO public repo)

---

## Demo Video Script

**Duration**: 5-10 minutes

1. **Introduction** (0:30)
   - Brief overview of project
   - Target application
   - Testing approach

2. **Manual Testing Demo** (2:00)
   - Show buggy.justtestit.org
   - Demonstrate test cases
   - Capture bugs in action

3. **Bug Reproduction** (2:00)
   - Show each identified bug
   - Step-by-step reproduction
   - Screenshots/evidence

4. **Automated Test Suite** (2:00)
   - Show test structure (POM)
   - Run tests in UI mode
   - Show test results

5. **Code Walkthrough** (1:30)
   - Playwright page objects
   - Test assertions
   - API integration

6. **Findings & Recommendations** (1:00)
   - Critical issues summary
   - Recommendations
   - Next steps

---

## Important Notes

⚠️ **CONFIDENTIALITY**: This assignment is confidential. Do NOT:
- Upload to public GitHub
- Share on YouTube/social media
- Distribute outside GoQuant team
- Publish without permission

✅ **BEST PRACTICES**:
- Keep code clean and well-commented
- Use meaningful variable names
- Follow testing conventions
- Document assumptions
- Include error handling

---

## References

- [Playwright Documentation](https://playwright.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [SADCN UI Components](https://ui.sadcn.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Testing Best Practices](https://buggy.justtestit.org)

---

**Last Updated**: 2024-11-26
**Assignment**: QA Engineer - Web Application Testing & Bug Analysis
**Company**: GoQuant
**Deadline**: 7 days from receipt

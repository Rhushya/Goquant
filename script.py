
import os
import json

# Create comprehensive project structure documentation
project_structure = {
    "QA-Assignment": {
        "frontend": {
            "description": "Next.js + SADCN + Tailwind + Playwright E2E",
            "files": [
                "package.json",
                "tsconfig.json",
                "next.config.js",
                "tailwind.config.ts",
                "postcss.config.js",
                ".env.local",
                "src/app/layout.tsx",
                "src/app/page.tsx",
                "src/pages/manual-tests.tsx",
                "src/pages/bug-reports.tsx",
                "src/pages/automation-suite.tsx",
                "src/components/TestCaseTable.tsx",
                "src/components/BugReportForm.tsx",
                "src/components/TestResultCard.tsx",
                "src/lib/api-client.ts",
                "src/lib/constants.ts",
                "tests/pages/BasePage.ts",
                "tests/pages/LoginPage.ts",
                "tests/pages/ProductPage.ts",
                "tests/pages/CartPage.ts",
                "tests/specs/auth.spec.ts",
                "tests/specs/products.spec.ts",
                "tests/specs/cart-checkout.spec.ts",
                "tests/specs/form-validation.spec.ts",
                "playwright.config.ts",
                "README.md"
            ]
        },
        "backend": {
            "description": "FastAPI + Pydantic + SQLAlchemy mock",
            "files": [
                "pyproject.toml",
                ".env",
                "requirements.txt",
                "app/__init__.py",
                "app/main.py",
                "app/config.py",
                "app/routers/__init__.py",
                "app/routers/auth.py",
                "app/routers/products.py",
                "app/routers/bugs.py",
                "app/models/__init__.py",
                "app/models/user.py",
                "app/models/product.py",
                "app/models/bug.py",
                "app/schemas.py",
                "app/db.py",
                "app/utils.py",
                "tests/__init__.py",
                "tests/test_auth_api.py",
                "tests/test_products_api.py",
                "tests/test_bugs_api.py",
                "README.md"
            ]
        },
        "docs": {
            "description": "Complete documentation & templates",
            "files": [
                "Manual_Test_Cases.md",
                "Bug_Report_Template.md",
                "Methodology.md",
                "Executive_Summary.md",
                "Tools_List.md",
                "Demo_Instructions.md"
            ]
        }
    }
}

print(json.dumps(project_structure, indent=2))

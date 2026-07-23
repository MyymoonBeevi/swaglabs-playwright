# swaglabs-playwright

# SwagLabs Playwright E2E Automation Framework

An End-to-End (E2E) automated testing framework built with **Playwright (TypeScript)** using the **Page Object Model (POM)** design pattern. This project automates functional testing for the [SauceDemo (Swag Labs)](https://www.saucedemo.com/) web application.

---

## 🏗️ Project Architecture

The framework is structured using the Page Object Model (POM) to separate test logic from page-specific code, promoting reusability and scalability.

```text
SWAGLABS-PLAYWRIGHT/
├── .github/workflows/    # CI/CD pipeline configurations (ci.yml)
├── data/                 # Test data fixtures & user details
├── fixtures/             # Custom Playwright test fixtures (test-base.ts)
├── pages/                # Page Object Model (POM) classes
│   ├── base.page.ts      # Base page with common UI actions
│   ├── login.page.ts     # Login page locators & actions
│   ├── inventory.page.ts # Inventory/Products page
│   ├── cart.page.ts      # Shopping cart page
│   └── checkout.page.ts  # Checkout workflow pages
├── tests/e2e/            # End-to-End test suites
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── utils/                # Constants, helper functions, and error messages
├── playwright.config.ts  # Playwright configuration file
├── package.json          # Project dependencies and scripts
└── README.md             # Framework documentation

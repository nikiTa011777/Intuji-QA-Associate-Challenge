
Cypress Automation Test Suite
=============================

Note: All materials submitted by the candidate will be used exclusively for assessment purposes.

This project contains automated tests using Cypress to validate user workflows such as login, cart and quantity management on https://automationexercise.com.

-----------------------------
Setup Steps
-----------------------------

1. Clone the repository:
   git clone <your-repo-url>
   cd <your-project-folder>

2. Install dependencies:
   npm install

3. Open Cypress Test Runner:
   npx cypress open

4. (Optional) Run tests in headless mode:
   npx cypress run

-----------------------------
How to Run Tests
-----------------------------

- Run `npx cypress open` and select tests from the cypress/e2e folder.
- Tests are written in .cy.js files.
- Fixtures (e.g., userList.json) provide test data.
- Custom Cypress commands like cy.login() and cy.addToCart() are used for cleaner code.

-----------------------------
Tools/Plugins Used
-----------------------------

- Cypress: End-to-end testing framework
- Faker.js: Generate realistic test data
- Cypress Commands: Reusable actions for login, cart, etc.
- Intercepts: Used to monitor network calls (e.g., add to cart)

-----------------------------
Known Limitations
-----------------------------

- Elements like "View Cart" may be hidden due to modal transitions; using { force: true } or direct navigation may be necessary.

-----------------------------
Folder Structure
-----------------------------

cypress/
├── e2e/          -> Test specifications
├── fixtures/     -> Test data (e.g., userList.json)
├── support/      -> Custom commands and configurations

-----------------------------
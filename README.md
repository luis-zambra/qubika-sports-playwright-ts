# qubika-sports-playwright-ts

Exercise 2 - Qubika sports site e2e tests with playwright and typescript

This solution contains an automated test that performs a register in the site via Axios, and executes ui steps to login with registered user, navigate to Categories section and create a category and a subcategory.

## Installation
Please make sure you have the following requirements.
- Git
- Node.js
- npm

Clone the project
```sh
git clone https://github.com/luis-zambra/qubika-sports-playwright-ts.git
```
Navigate to root folder and install the dependencies
```sh
cd qubika-sports-playwright-ts
npm install
```
Install playwright dependencies, this will include the Chromium browser where the tests will be executed
```sh
npx playwright install
```

## Running the tests
Once all the dependencies are installed the framework is ready to use, run the following command to execute the tests
```sh
npm run test
```
Once tests are run, HTML report will be available and screenshots and videos in case of failure, execute the following command to view HTML report
```sh
npx playwright show-report
```
Screenshots and videos will be available in `/test-results` folder

## Solution explanation and enhancements

The framework structure consists in two main folders:
- Api: Contains data generators, models for requests and responses, urls and methods to call the endpoints of the site.
- E2E: Contains page objects and spec files.

The project was made with page object design pattern and SOLID principles in mind, which provides maintainability and makes it easier to extend in the future. The automation strategy also contemplates efficiency and legibility and the moment of performing validations, using dynamic waiters, highlighting elements at the moment of evaluating them and using custom error messages.

Some improvements that can be made to enhance the solution:
- The selector strategy for searching for elements relies heavily in robustness with what is available in the DOM. The ideal option for each selector would be having custom test tags only to be used for test automation, as ids may change dynamically and other types of selectors are not as reliable.

- Using behavior driven development tools such as Cucumber and Gherkin, to write descriptive, high level features, and reusable steps. This would also enable using reporting tools that support these features, making them more readable and easier to debug.
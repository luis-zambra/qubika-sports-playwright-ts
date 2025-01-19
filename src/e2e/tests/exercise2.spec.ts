import { test, expect } from '@playwright/test';
import { registerUser } from '../../api/authController';
import { generateRegisterUserRequest } from '../../api/helpers/dataGenerator';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CategoriesPage } from '../pages/categories.page';
import casual from 'casual';

test('Register user via API and create categories via UI', async ({ page }) => {
  // Step 1: Call API to register new user
  const registerRequest = generateRegisterUserRequest();
  const registerResponse = await registerUser(registerRequest);
  expect(
    registerResponse,
    'Register user response was not defined.'
  ).toBeDefined();
  expect(
    registerResponse.status,
    'Response status from register user was not the expected.'
  ).toBe(201);
  expect(
    registerResponse.data?.email,
    'Email received in registered user response was not the expected.'
  ).toEqual(registerRequest.email);

  // Step 2: Navigate to login page and login with registered user
  const email = registerRequest.email;
  const password = registerRequest.password;
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  expect(
    await loginPage.validateLoginPageLoaded(),
     'Login page did not load as expected.'
    ).toBe(true);
  await loginPage.login(email, password);

  // Step 3: Validate user is logged in by checking for dashboard sidebar
  const dashboardPage = new DashboardPage(page);
  expect(
    await dashboardPage.validateDashboardLoaded(),
     'Dashboard page did not load as expected.'
    ).toBe(true);

  // Step 4: Go to category page
  await dashboardPage.navigateToCategories();
  const categoriesPage = new CategoriesPage(page);
  expect(
    await categoriesPage.validateCategoriesLoaded() ,
    'Categories page did not load as expected.'
  ).toBe(true);

  // Step 5: Create a new category and validate it was created successfully
  const newCategory = casual.word;
  await categoriesPage.addNewCategory(newCategory);
  await categoriesPage.navigateToLastPageOfTable();
  let lastCategory = await categoriesPage.getLastEntryOfCategoriesTable();
  expect(
    lastCategory[0],
    'Category name of last entry was not the expected'
  ).toEqual(newCategory);

  // Step 6: Create a sub category and validate it is displayed in the categories list
  const newSubCategory = casual.string;
  await categoriesPage.addNewCategory(newSubCategory, newCategory);
  await categoriesPage.navigateToLastPageOfTable();
  lastCategory = await categoriesPage.getLastEntryOfCategoriesTable();
  expect(
    lastCategory[0],
    'Category name of last entry was not the expected'
  ).toEqual(newSubCategory);
  expect(
    lastCategory[1],
    'Parent category name of last entry was not the expected'
  ).toEqual(newCategory);

});
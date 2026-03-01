import { test, expect, Locator } from '@playwright/test';

test('Login should be successful with valid credentials', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('Checkboxes should be checked', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.getByRole('checkbox').first().check();

    await expect(page.getByRole('checkbox').first()).toBeChecked();
    await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
});

test('Select dropdown option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    await page.locator('#dropdown').selectOption('1');
    await expect(page.locator('#dropdown')).toHaveValue('1');

    await page.locator('#dropdown').selectOption('2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
});

test('Hyperlinks test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/status_codes');

    await page.getByRole('link', { name: '200' }).click();
    await expect(page.getByRole('paragraph')).toContainText('This page returned a 200 status code. For a definition and common list of HTTP status codes, go here');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '301' }).click();
    await expect(page.getByRole('paragraph')).toContainText('This page returned a 301 status code. For a definition and common list of HTTP status codes, go here');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '404' }).click();
    await expect(page.getByRole('paragraph')).toContainText('This page returned a 404 status code. For a definition and common list of HTTP status codes, go here');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '500' }).click();
    await expect(page.getByRole('paragraph')).toContainText('This page returned a 500 status code. For a definition and common list of HTTP status codes, go here');
    await page.getByRole('link', { name: 'here' }).click();
    await expect(page.getByRole('link', { name: '500' })).toBeVisible();
});
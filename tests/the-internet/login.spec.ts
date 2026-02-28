import { test, expect } from '@playwright/test';

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
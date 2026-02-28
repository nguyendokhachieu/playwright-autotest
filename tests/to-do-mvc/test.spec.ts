import { test, expect } from '@playwright/test';

test('Add note successfully', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const noteContent = 'note one';

    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await expect(page.getByText(noteContent)).toBeVisible();
    await expect(page.locator('body')).toContainText(noteContent);
});

test('Delete note successfully', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const noteContent = 'note one';

    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await expect(page.getByText(noteContent)).toBeVisible();

    await page.getByText(noteContent).click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText(noteContent)).not.toBeVisible();
});

test('Edit note successfully', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const noteContent = 'will buy 2 chickens next morning';
    const editedNoteContent = 'will buy 2 chickens next Monday';

    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toContainText(noteContent);

    await page.getByTestId('todo-title').dblclick();

    await page.getByRole('textbox', { name: 'Edit' }).fill(editedNoteContent);
    await page.getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toContainText(editedNoteContent);
});

test('Filter notes successfully', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const noteContent1 = 'note one';
    const noteContent2 = 'note two';

    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent1);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent2);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await expect(page.getByText(noteContent1)).toBeVisible();
    await expect(page.getByText(noteContent2)).toBeVisible();
    await expect(page.locator('body')).toContainText(noteContent1);
    await expect(page.locator('body')).toContainText(noteContent2);

    await page.getByRole('listitem').filter({ hasText: 'note one' }).getByLabel('Toggle Todo').check();

    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page.getByText(noteContent1)).not.toBeVisible();
    await expect(page.getByText(noteContent2)).toBeVisible();

    await page.getByRole('link', { name: 'Completed' }).click();

    await expect(page.getByText(noteContent1)).toBeVisible();
    await expect(page.getByText(noteContent2)).not.toBeVisible();
});

test('Clear completed notes successfully', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const noteContent1 = 'note one';
    const noteContent2 = 'note two';
    const noteContent3 = 'note three';

    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent1);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent2);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(noteContent3);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await page.getByRole('listitem').filter({ hasText: 'note one' }).getByLabel('Toggle Todo').check();
    await page.getByRole('listitem').filter({ hasText: 'note two' }).getByLabel('Toggle Todo').check();

    await expect(page.getByText(noteContent1)).toBeVisible();
    await expect(page.getByText(noteContent2)).toBeVisible();
    await expect(page.getByText(noteContent3)).toBeVisible();

    await page.getByRole('button', { name: 'Clear completed' }).click();

    await expect(page.getByText(noteContent1)).not.toBeVisible();
    await expect(page.getByText(noteContent2)).not.toBeVisible();
    await expect(page.getByText(noteContent3)).toBeVisible();
});
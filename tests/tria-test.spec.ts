import { today } from '@/lib/constants';
import { expect, test } from '@playwright/test';
import { format, sub } from 'date-fns';

test.describe('Tria test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('test /tecaj', async ({ page }) => {
    await page.getByRole('link', { name: 'Trenutna Tečajna lista' }).click();

    let dateInput = page.getByPlaceholder('YYYY-MM-DD');
    let dateValue = await dateInput.inputValue();
    expect(dateValue).toBe(today);

    let datumPrimjene = page.getByTestId('datumPrimjene');
    let datumPrimjeneText = await datumPrimjene.textContent();
    expect(datumPrimjeneText).toBe(today);

    await expect(page.getByText('Next')).toBeDisabled();

    await page.getByText('Prev').click();

    let expectedDate = format(sub(new Date(today), { days: 1 }), 'yyyy-MM-dd');

    dateValue = await dateInput.inputValue();
    expect(dateValue).toBe(expectedDate);

    await page.waitForTimeout(1000);

    datumPrimjeneText = await datumPrimjene.textContent();
    expect(datumPrimjeneText).toBe(expectedDate);

    await page.getByText('Next').click();

    dateValue = await dateInput.inputValue();
    expect(dateValue).toBe(today);

    datumPrimjeneText = await datumPrimjene.textContent();
    expect(datumPrimjeneText).toBe(today);
  });

  test('test /tecaj date input', async ({ page }) => {
    await page.getByRole('link', { name: 'Trenutna Tečajna lista' }).click();
    let dateInput = page.getByPlaceholder('YYYY-MM-DD');
    await dateInput.click();
    await dateInput.fill('2024-01-01');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(1000);

    let datumPrimjene = page.getByTestId('datumPrimjene');
    let datumPrimjeneText = await datumPrimjene.textContent();
    expect(datumPrimjeneText).toBe('2024-01-01');

    await dateInput.click();
    await dateInput.fill('2023-02-29');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(1000);
    let errorMessage = page.getByTestId('input-error-message');
    let errorMessageText = await errorMessage.textContent();
    expect(errorMessageText).toBe('Invalid date. The year is not a leap year.');

    await dateInput.click();
    await dateInput.fill('2024.05.05');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(1000);
    errorMessage = page.getByTestId('input-error-message');
    errorMessageText = await errorMessage.textContent();
    expect(errorMessageText).toBe(
      'Invalid date format. Please use the format YYYY-MM-DD.'
    );

    await dateInput.click();
    await dateInput.fill('2025-01-01');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(1000);

    errorMessage = page.getByTestId('input-error-message');
    errorMessageText = await errorMessage.textContent();
    expect(errorMessageText).toBe(
      `Please select a date that is between 2023-01-01 and ${today}.`
    );
  });

  test('test tecaj/povijest/valuta/datum', async ({ page }) => {
    await page.getByRole('link', { name: 'Trenutna Tečajna lista' }).click();

    await page.getByText('Prev').click();

    await page.waitForTimeout(1000);

    let dateInput = page.getByPlaceholder('YYYY-MM-DD');
    let dateValue = await dateInput.inputValue();

    await page.getByRole('link', { name: 'AUD' }).click();

    await page.waitForURL(
      `http://127.0.0.1:3000/povijest/AUD/${dateValue}?range=7&select=false`
    );

    let firstTd = page.locator('td:nth-child(7)').first();
    let firstTdText = await firstTd.textContent();
    expect(firstTdText).toBe('AUD');

    let calendarButton = page.getByTestId('dropdown-calendar');
    let calendarButtonText = await calendarButton.innerText();
    expect(calendarButtonText).toBe(dateValue);

    await expect(page.getByTestId('dropdown-calendar')).toBeDisabled();
  });

  test('test povijest/valuta/datum', async ({ page }) => {
    await page.getByRole('link', { name: 'Povijest Tečajnih lista' }).click();

    let firstTd = page.locator('td:nth-child(7)').first();
    let firstTdText = await firstTd.textContent();
    expect(firstTdText).toBe('USD');

    let calendarButton = page.getByTestId('dropdown-calendar');
    let calendarButtonText = await calendarButton.innerText();
    expect(calendarButtonText).toBe(today);
  });
});

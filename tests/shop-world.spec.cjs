const { test, expect } = require('@playwright/test');

test('first-person shop loads and its locations open existing game screens', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  const welcome = page.locator('#go');
  if (await welcome.isVisible().catch(() => false)) await welcome.click();

  await expect(page.locator('#shop-world')).toBeVisible();
  await expect(page.locator('#shop-world-canvas')).toBeVisible({ timeout: 20000 });
  const size = await page.locator('#shop-world-canvas').evaluate(canvas => ({
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }));
  expect(size.width).toBeGreaterThan(300);
  expect(size.height).toBeGreaterThan(250);

  await page.locator('[data-world-action="computer"]').click();
  await expect(page.locator('#st-pc')).toBeVisible();

  await page.locator('#tabs button[data-t="shop"]').click();
  await expect(page.locator('#shop-world-canvas')).toBeVisible();
  await page.locator('[data-world-action="jobs"]').click();
  await expect(page.locator('#st-jobs')).toBeVisible();

  await page.locator('#tabs button[data-t="shop"]').click();
  await expect(page.locator('#shop-world-canvas')).toBeVisible();
  await page.locator('[data-world-action="bench"]').click();
  await expect(page.locator('#st-jobs')).toBeVisible();

  expect(pageErrors, 'Uncaught JavaScript errors in the first-person shop').toEqual([]);
});

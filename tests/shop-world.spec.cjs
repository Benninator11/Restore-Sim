const { test, expect } = require('@playwright/test');

test('isometric shop loads, customer story plays and retro web store works', async ({ page }) => {
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
  expect(size.height).toBeGreaterThan(350);
  await expect(page.locator('.shop-world-clock')).toBeVisible();
  await expect(page.locator('.shop-world-controls')).toContainText('KLICK');
  await page.screenshot({ path: 'test-results/shop-isometric.png' });

  await page.locator('[data-world-action="customer"]').click();
  await expect(page.locator('#dlg .dialog')).toBeVisible();
  await expect(page.locator('#dlg .choices button')).toHaveCount(2);
  await page.locator('#dlg .choices button').first().click();
  await expect(page.locator('#dlg .choices button')).toHaveCount(1);
  await page.locator('#dlg .choices button').first().click();
  await expect(page.locator('#dlg [data-m="1"]')).toBeVisible();
  await page.locator('#dlg [data-m="1"]').click();

  await page.locator('[data-world-action="computer"]').click();
  await expect(page.locator('#st-pc')).toBeVisible();
  await page.locator('#st-pc .menu button[data-t="web"]').click();
  await expect(page.locator('#st-pc .net-home')).toBeVisible();
  await page.locator('#st-pc [data-net="market"]').click();
  await expect(page.locator('#st-pc .market-item')).toHaveCount(1);
  await page.locator('#st-pc [data-market-k]').click();
  await expect(page.locator('#st-pc .market-item button')).toHaveText('Unterwegs');
  await page.locator('#st-pc .menu button[data-t="decor"]').click();
  await page.locator('#st-pc [data-decor-buy="plant"]').click();
  await expect(page.locator('#st-pc [data-decor-buy="plant"]')).toHaveText('Eingebaut');
  await page.locator('#tabs button[data-t="shop"]').click();
  await expect(page.locator('#shop-world')).toHaveAttribute('data-decor', /plant/);
  await page.locator('[data-world-action="bench"]').click();
  await expect(page.locator('#st-bench .device3d-stage')).toBeVisible();
  await page.screenshot({ path: 'test-results/workbench-topdown.png' });
  expect(pageErrors, 'Uncaught JavaScript errors in shop, dialogue and web store').toEqual([]);
});
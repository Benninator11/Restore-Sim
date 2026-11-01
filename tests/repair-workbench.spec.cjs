const { test, expect } = require('@playwright/test');

function makeState(dev = 'handheld', faults = ['battery'], opened = false) {
  const partDefaults = {
    handheld: { screen: 'ok', battery: faults.includes('battery') ? 'broken' : 'ok', btn: 'ok' },
    tablet: { screen: 'ok', battery: 'ok', camera: 'ok', speaker: 'ok', charging: faults.includes('charging') ? 'broken' : 'ok' },
    laptop: { screen: 'ok', battery: 'ok', board: 'ok', fan: 'ok', trackpad: 'ok', charging: 'ok' },
    phone: { battery: 'ok', speaker: 'ok', keypad: 'ok' },
    camera: { sensor: 'ok', battery: 'ok', flash: 'ok' },
    router: { board: 'ok', antenna: 'ok', psu: 'ok', fan: 'ok', charging: 'ok' }
  };
  const parts = partDefaults[dev] || {};
  const screws = { handheld: 4, tablet: 6, laptop: 8, phone: 4, camera: 6, router: 8 }[dev] || 4;
  const job = { id: 7, name: 'Browser-Testkunde', dev, faults: faults.slice(), fee: 6500, accDay: 1, stage: 'new', st: null, pick: null, story: null, online: false, q: 0 };
  if (opened) {
    job.st = {
      screws, sOut: screws, screwOut: Array(screws).fill(true), screwsInBowl: Array(screws).fill(true),
      flipped: true, coverOff: true, closing: false, boardOut: false, tested: false, ph: 'inside',
      parts: { ...parts },
      dirt: Array.from({ length: 14 }, (_, i) => ({ x: 42 + (i * 19) % 310, y: 44 + (i * 13) % 210, r: 10, a: .72, hard: i % 3 === 0 })),
      checked: {}, have: {}, mistakes: [], joints: {}, matItems: [], trashItems: []
    };
  }
  return {
    day: 1, money: 20000, rep: 50, rent: 2500, flags: {}, jobs: [job],
    inv: dev === 'tablet' ? { 'tablet:charging': 1 } : {}, orders: [], queue: [], qi: 0,
    mail: [], log: [], phase: 'day', stats: { done: 5, earned: 0 }, nid: 100, bench: 7
  };
}

async function bootWorkbench(page, state = makeState()) {
  await page.addInitScript(save => localStorage.setItem('kuroneko_v1', JSON.stringify(save)), state);
  await page.goto('/');
  await page.locator('#tabs button[data-t="bench"]').click();
  await expect(page.locator('#st-bench #tbl')).toBeVisible();
  await expect(page.locator('#device3d-stage')).toBeVisible();
}
async function stateValue(page, expression) {
  return page.evaluate(expr => eval(expr), expression);
}
async function holdScrew(page, index, milliseconds = 3150) {
  const screw = page.locator('#dsv .sc').nth(index);
  await expect(screw).toBeVisible();
  await screw.evaluate(el => el.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true, cancelable: true, pointerId: 77, pointerType: 'mouse', button: 0
  })));
  await page.waitForTimeout(milliseconds);
}
async function openAndRemoveBoard(page) {
  await expect(page.locator('#a_flipback')).toBeVisible();
  await page.locator('#a_flipback').click();
  await expect(page.locator('#dsv .sc')).toHaveCount(4);
  await page.locator('#tools button[data-t="driver"]').click();
  for (let i = 0; i < 4; i++) await holdScrew(page, i);
  await expect(page.locator('#a_off')).toBeVisible();
  await page.locator('#tools button[data-t="hand"]').click();
  await page.locator('#a_off').click();
  await expect(page.locator('#dsv .micro-chip')).toHaveCount(18);
  await expect(page.locator('#a_boardout')).toBeVisible();
  await page.locator('#a_boardout').click();
  await expect(page.locator('#dsv.board-view')).toBeVisible();
}

test('fullscreen overhead workbench matches the repair-table layout and keeps controls working', async ({ page }) => {
  await bootWorkbench(page);
  await expect(page.locator('body')).toHaveClass(/workbench-active/);
  await expect(page.locator('#st-bench')).toHaveCSS('position', 'fixed');
  await expect(page.locator('#bench-rotate-left')).toBeVisible();
  await expect(page.locator('#bench-zoom-in')).toBeVisible();
  await expect(page.locator('.repair-note')).toBeVisible();
  await expect(page.locator('#bench-extra .mat-panel')).toBeVisible();
  await expect(page.locator('#bq')).toBeVisible();
  await page.screenshot({ path: 'test-results/workbench-reference-layout.png', fullPage: true });

  const initialZoom = await stateValue(page, 'S.jobs[0].st.viewZoom || 1');
  await page.locator('#bench-zoom-in').click();
  expect(await stateValue(page, 'S.jobs[0].st.viewZoom')).toBeGreaterThan(initialZoom);
  await page.locator('#bench-rotate-right').click();
  expect(await stateValue(page, 'S.jobs[0].st.viewRotZ')).toBe(15);

  await page.locator('#bq').click();
  await expect(page.locator('body')).not.toHaveClass(/workbench-active/);
  await expect(page.locator('#st-jobs')).toBeVisible();
});

let pageErrors = [];
test.beforeEach(async ({ page }) => {
  pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
});
test.afterEach(async () => {
  expect(pageErrors, 'Uncaught browser JavaScript errors').toEqual([]);
});

test('workbench keeps the blue mat design after tools, tabs and re-renders', async ({ page }) => {
  await bootWorkbench(page);
  const initial = await page.locator('#tbl').evaluate(el => getComputedStyle(el).backgroundImage);
  expect(initial).toContain('linear-gradient');
  expect(initial).not.toContain('data:image/svg+xml');
  const oldOverride = await page.locator('style').evaluateAll(styles =>
    styles.some(style => style.textContent.includes('.table{background:var(--wood)'))
  );
  expect(oldOverride).toBe(false);
  for (const tool of ['hand','driver','tweezers','brush','cloth','meter','chiptest','solder','hotair','spudger','microscope','ultrasonic']) {
    const button = page.locator('#tools button[data-t="' + tool + '"]');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await button.click();
    await expect(page.locator('#tbl')).toBeVisible();
    await expect(page.locator('#device3d-stage')).toBeVisible();
    expect(await page.locator('#tbl').evaluate(el => getComputedStyle(el).backgroundImage)).toBe(initial);
  }
  for (const tab of ['jobs','shop','pc','bench']) await page.locator('#tabs button[data-t="' + tab + '"]').click();
  expect(await page.locator('#tbl').evaluate(el => getComputedStyle(el).backgroundImage)).toBe(initial);
  await page.screenshot({ path: 'test-results/workbench-stable.png', fullPage: true });
});

test('screwdriver requires a three-second hold and stores each removed screw', async ({ page }) => {
  await bootWorkbench(page);
  await page.locator('#a_flipback').click();
  await expect(page.locator('#dsv .sc')).toHaveCount(4);
  await page.locator('#tools button[data-t="driver"]').click();
  const first = page.locator('#dsv .sc').first();
  await first.evaluate(el => {
    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 77, pointerType: 'mouse' }));
    setTimeout(() => el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 77, pointerType: 'mouse' })), 350);
  });
  await page.waitForTimeout(550);
  expect(await stateValue(page, 'S.jobs[0].st.screwOut[0]')).toBe(false);
  await holdScrew(page, 0);
  expect(await stateValue(page, 'S.jobs[0].st.screwOut[0]')).toBe(true);
  expect(await stateValue(page, 'S.jobs[0].st.screwsInBowl[0]')).toBe(true);
  for (let i = 1; i < 4; i++) await holdScrew(page, i);
  expect(await stateValue(page, 'S.jobs[0].st.screwOut.every(Boolean)')).toBe(true);
  expect(await stateValue(page, 'S.jobs[0].st.screwsInBowl.every(Boolean)')).toBe(true);
  await expect(page.locator('#a_off')).toBeVisible();
});

test('back cover, extracted board, chip tester and individual solder pins are interactive', async ({ page }) => {
  await bootWorkbench(page);
  await openAndRemoveBoard(page);
  expect(await page.locator('#dsv').evaluate(el => el.viewBox.baseVal.width / el.viewBox.baseVal.height)).toBeCloseTo(4 / 3, 1);
  await expect(page.locator('#dsv .micro-chip')).toHaveCount(18);
  expect(await page.locator('#dsv .micro-pin').count()).toBeGreaterThan(40);
  expect(await page.locator('#dsv .part-pin').count()).toBeGreaterThan(10);
  expect(await page.locator('#dsv .smd-pin').count()).toBeGreaterThan(10);

  const chip = page.locator('#dsv .micro-chip').first();
  const chipId = await chip.getAttribute('data-micro');
  await page.locator('#tools button[data-t="chiptest"]').click();
  await page.locator('#dsv .micro-chip[data-micro="' + chipId + '"]').click();
  await expect(page.locator('.chip-log')).toContainText('1/18');
  expect(await stateValue(page, "S.jobs[0].st.micro.find(x=>x.id==='" + chipId + "').identified")).toBe(true);

  await page.locator('#tools button[data-t="solder"]').click();
  await page.locator('#dsv .micro-pin[data-micro="' + chipId + '"]').first().click();
  expect(await stateValue(page, "S.jobs[0].st.micro.find(x=>x.id==='" + chipId + "').pinOut.some(Boolean)")).toBe(true);

  const partPin = page.locator('#dsv .part-pin').first();
  const partId = await partPin.getAttribute('data-p');
  await partPin.click();
  expect(await stateValue(page, "S.jobs[0].st.joints['" + partId + "'].some(Boolean)")).toBe(true);

  const smdPin = page.locator('#dsv .smd-pin').first();
  const smdId = await smdPin.getAttribute('data-smd');
  await smdPin.click();
  expect(await stateValue(page, "S.jobs[0].st.smdParts.find(x=>x.id==='" + smdId + "').pinOut.some(Boolean)")).toBe(true);
  await page.screenshot({ path: 'test-results/board-pin-repair.png', fullPage: true });
});

test('brush, alcohol cloth, meter and ultrasonic cleaner change board state', async ({ page }) => {
  await bootWorkbench(page);
  await openAndRemoveBoard(page);
  const dirt = page.locator('#dsv .dirt').first();
  const dirtIndex = Number(await dirt.getAttribute('data-i'));
  const before = await stateValue(page, 'S.jobs[0].st.dirt[' + dirtIndex + '].a');
  await page.locator('#tools button[data-t="brush"]').click();
  await page.locator('#dsv .dirt').first().dispatchEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 78, pointerType: 'mouse' });
  const afterBrush = await stateValue(page, 'S.jobs[0].st.dirt[' + dirtIndex + '].a');
  expect(afterBrush).toBeLessThan(before);
  await page.locator('#tools button[data-t="cloth"]').click();
  await page.locator('#dsv .dirt').first().dispatchEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 79, pointerType: 'mouse' });
  const afterCloth = await stateValue(page, 'S.jobs[0].st.dirt[' + dirtIndex + '].a');
  expect(afterCloth).toBeLessThan(afterBrush);

  await page.locator('#tools button[data-t="meter"]').click();
  const part = page.locator('#dsv .pt').first();
  const partId = await part.getAttribute('data-p');
  await part.click();
  expect(await stateValue(page, "S.jobs[0].st.checked['" + partId + "']")).toBeTruthy();

  await page.locator('#tools button[data-t="ultrasonic"]').click();
  await page.locator('#dsv .dirt').first().click();
  await expect(page.locator('#dsv .dirt')).toHaveCount(0);
});

test('tweezers remove a socket part to the mat and install a stocked replacement', async ({ page }) => {
  await bootWorkbench(page, makeState('tablet', ['charging'], true));
  await page.locator('#tools button[data-t="tweezers"]').click();
  await page.locator('#dsv .pt[data-p="charging"]').click();
  expect(await stateValue(page, 'S.jobs[0].st.parts.charging')).toBe('removed');
  expect(await stateValue(page, "S.jobs[0].st.matItems.some(x=>x.id==='socket:charging')")).toBe(true);
  await page.locator('#dsv .pt[data-p="charging"]').click();
  expect(await stateValue(page, 'S.jobs[0].st.parts.charging')).toBe('new');
  expect(await stateValue(page, "S.inv['tablet:charging']")).toBe(0);
  expect(await stateValue(page, "S.jobs[0].st.matItems.some(x=>x.id==='socket:charging')")).toBe(false);
});

test('multiple device geometries fit desktop and mobile viewports', async ({ page }) => {
  await page.goto('/'); // Establish the same-origin context before touching localStorage.
  for (const dev of ['handheld','phone','tablet','laptop','watch','camera','router','cassette','discman','pockettv','calculator','printer','alarmclock','photoalbum','remote']) {
    await page.evaluate(save => localStorage.setItem('kuroneko_v1', JSON.stringify(save)), makeState(dev, []));
    await page.reload();
    await page.locator('#tabs button[data-t="bench"]').click();
    const stage = page.locator('#device3d-stage');
    await expect(stage).toBeVisible();
    const box = await stage.boundingBox();
    expect(box.width).toBeGreaterThan(100);
    expect(box.height).toBeGreaterThan(80);
    await page.setViewportSize({ width: 390, height: 844 });
    const dims = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
      stage: document.querySelector('#device3d-stage').getBoundingClientRect().width
    }));
    expect(dims.page).toBeLessThanOrEqual(dims.viewport + 1);
    expect(dims.stage).toBeGreaterThan(80);
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
});

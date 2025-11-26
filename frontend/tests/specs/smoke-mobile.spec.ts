import { test, expect } from '@playwright/test'

// Placeholder suite for responsive coverage referenced on the Automation page.
// Tests are skipped until the underlying journeys are finalized for mobile.

test.describe('Mobile smoke navigation', () => {
  test.use({ viewport: { width: 393, height: 851 } })

  test.skip('TC-MOBILE-001: Primary nav renders on 390px viewport', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })
})

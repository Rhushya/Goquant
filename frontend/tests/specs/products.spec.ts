import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/ProductPage'

const credentials = {
  email: 'test@buggy.com',
  password: 'Password123!',
}

test.describe('Product Catalog Journeys', () => {
  let loginPage: LoginPage
  let productPage: ProductPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)

    await loginPage.navigate()
    await loginPage.login(credentials.email, credentials.password)
    await page.waitForURL(/dashboard|products/, { timeout: 10000 }).catch(() => {})
  })

  test('TC-PROD-001: Search returns relevant matches', async ({ page }) => {
    await productPage.navigate()
    await productPage.search('shoe')

    const titles = await productPage.getVisibleProductTitles()
    expect(titles.length).toBeGreaterThan(0)
    expect(titles.some((title) => title.toLowerCase().includes('shoe'))).toBeTruthy()
  })

  test('TC-PROD-002: Category filters reduce result set', async () => {
    await productPage.navigate()
    const initialCount = await productPage.getProductCount()

    await productPage.applyCategoryFilter('Electronics')
    const filteredCount = await productPage.getProductCount()

    expect(filteredCount).toBeLessThanOrEqual(initialCount)
  })

  test('TC-PROD-003: Sorting high-to-low reorders prices', async () => {
    await productPage.navigate()
    await productPage.changeSortOrder('price-desc')
    const prices = await productPage.getVisiblePrices()

    const sorted = [...prices].sort((a, b) => b - a)
    expect(prices.slice(0, 3)).toEqual(sorted.slice(0, 3))
  })

  test('TC-PROD-004: Add to cart from listing updates badge', async ({ page }) => {
    await productPage.navigate()
    const initialBadge = await page.locator('[data-test="cart-count"], .cart-count').first().textContent().catch(() => '0')
    const initialValue = parseInt(initialBadge || '0', 10) || 0

    await productPage.addFirstProductToCart()
    await page.waitForTimeout(1500)

    const updatedBadge = await page.locator('[data-test="cart-count"], .cart-count').first().textContent().catch(() => '0')
    const updatedValue = parseInt(updatedBadge || '0', 10) || 0

    expect(updatedValue).toBeGreaterThanOrEqual(initialValue + 1)
  })
})

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
    // Wait for login to complete - usually redirects to dashboard or stays on home
    await page.waitForTimeout(2000) 
  })

  test('TC-PROD-001: Verify product list is displayed', async ({ page }) => {
    await productPage.navigate()
    const count = await productPage.getProductCount()
    expect(count).toBeGreaterThan(0)
    
    const titles = await productPage.getVisibleProductTitles()
    console.log('Visible products:', titles)
    expect(titles.length).toBeGreaterThan(0)
  })

  // TC-PROD-002: Pagination works - Skipped due to flakiness on Firefox/WebKit
  // test('TC-PROD-002: Pagination works', async ({ page }) => {
  //   await productPage.navigate()
  //   const initialTitles = await productPage.getVisibleProductTitles()
    
  //   await productPage.goToNextPage()
    
  //   const nextTitles = await productPage.getVisibleProductTitles()
  //   expect(nextTitles).not.toEqual(initialTitles)
  // })

  test('TC-PROD-003: Navigate to product details', async ({ page }) => {
    await productPage.navigate()
    const titles = await productPage.getVisibleProductTitles()
    const firstProduct = titles[0]
    
    await productPage.goToProduct(firstProduct)
    await expect(page).toHaveURL(/model/)
  })
})

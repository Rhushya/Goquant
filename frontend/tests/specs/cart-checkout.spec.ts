import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/ProductPage'
import { CartPage } from '../pages/CartPage'

const credentials = {
  email: 'test@buggy.com',
  password: 'Password123!',
}

test.describe('Cart and Checkout Journeys', () => {
  let loginPage: LoginPage
  let productPage: ProductPage
  let cartPage: CartPage

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    cartPage = new CartPage(page)

    await loginPage.navigate()
    await loginPage.login(credentials.email, credentials.password)
    await page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => {})
  })

  test('TC-CART-001: User can add item and proceed to checkout', async ({ page }) => {
    await productPage.navigate()
    await productPage.addFirstProductToCart()

    await cartPage.open()
    expect(await cartPage.getCartCount()).toBeGreaterThanOrEqual(1)

    await cartPage.proceedToCheckout()
    await page.waitForURL(/checkout/, { timeout: 7000 }).catch(() => {})
    expect(page.url()).toContain('checkout')
  })

  test('TC-CART-002: Updating quantity recalculates subtotal', async () => {
    await productPage.navigate()
    await productPage.addFirstProductToCart()

    await cartPage.open()
    const originalSubtotal = await cartPage.getSubtotalText()

    await cartPage.updateFirstItemQuantity(2)
    await cartPage.waitForElement('[data-test="cart-subtotal"], .cart-summary__subtotal', 7000)
    const updatedSubtotal = await cartPage.getSubtotalText()

    expect(updatedSubtotal).not.toEqual(originalSubtotal)
  })

  test('TC-CART-003: Removing last item disables checkout', async ({ page }) => {
    await productPage.navigate()
    await productPage.addFirstProductToCart()
    await cartPage.open()

    await cartPage.removeFirstItem()
    await page.waitForTimeout(1000)

    const checkoutButton = page.locator('button[data-test="checkout"], button:has-text("Checkout")')
    await expect(checkoutButton).toBeDisabled({ timeout: 3000 })
  })
})

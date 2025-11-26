import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  private readonly cartLink = '[data-test="nav-cart"], a[href="/cart"], [aria-label="Cart"]'
  private readonly cartLineItem = '[data-test="cart-line"], .cart-line'
  private readonly cartBadge = '[data-test="cart-count"], .cart-count'
  private readonly quantityInput = '[data-test="cart-line"] input[type="number"], .cart-line input[type="number"], [data-test="quantity"]'
  private readonly removeButton = '[data-test="cart-line"] [data-test="remove-item"], .cart-line button:has-text("Remove"), button[data-test="remove-item"]'
  private readonly checkoutButton = 'button[data-test="checkout"], button:has-text("Checkout")'
  private readonly subtotal = '[data-test="cart-subtotal"], .cart-summary__subtotal strong'

  async open() {
    if (await this.isVisible(this.cartLink)) {
      await this.click(this.cartLink)
    } else {
      await this.goto('/cart')
    }
    await this.waitForElement(this.cartLineItem, 7000)
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator(this.cartBadge)
    if (await badge.count()) {
      const text = (await badge.first().innerText()).trim()
      const parsed = parseInt(text, 10)
      if (!Number.isNaN(parsed)) return parsed
    }
    return await this.page.locator(this.cartLineItem).count()
  }

  async updateFirstItemQuantity(quantity: number) {
    const input = this.page.locator(this.quantityInput).first()
    await input.fill('')
    await input.type(String(quantity))
  }

  async removeFirstItem() {
    await this.page.locator(this.removeButton).first().click()
  }

  async proceedToCheckout() {
    await this.page.locator(this.checkoutButton).click()
  }

  async getSubtotalText(): Promise<string> {
    return (await this.getText(this.subtotal)).trim()
  }
}

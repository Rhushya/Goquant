import { BasePage } from './BasePage'

export class ProductPage extends BasePage {
  private readonly searchInput = 'input[name="search"], [data-test="product-search"]'
  private readonly searchSubmit = 'button[type="submit"], [data-test="search-submit"]'
  private readonly filterDropdown = '[data-test="category-filter"], select[name="category"]'
  private readonly sortSelect = '[data-test="sort-select"], select[name="sort"]'
  private readonly productCard = '[data-test="product-card"], .product-card'
  private readonly productTitle = '[data-test="product-title"], .product-title'
  private readonly addToCartButton = '[data-test="add-to-cart"], button:has-text("Add to cart")'
  private readonly priceTag = '[data-test="product-price"], .product-price'

  async navigate() {
    await this.goto('/products')
    await this.waitForElement(this.productCard)
  }

  async search(term: string) {
    await this.fill(this.searchInput, term)
    if (await this.isVisible(this.searchSubmit)) {
      await this.click(this.searchSubmit)
    } else {
      await this.page.keyboard.press('Enter')
    }
    await this.waitForElement(this.productCard)
  }

  async applyCategoryFilter(category: string) {
    await this.selectOption(this.filterDropdown, { label: category })
    await this.waitForElement(this.productCard)
  }

  async changeSortOrder(value: string) {
    await this.selectOption(this.sortSelect, { value })
    await this.waitForElement(this.productCard)
  }

  async addFirstProductToCart() {
    const card = this.page.locator(this.productCard).first()
    await card.hover().catch(() => {})
    const button = card.locator(this.addToCartButton)
    await button.first().click()
  }

  async getVisibleProductTitles(): Promise<string[]> {
    const titles = await this.page.locator(`${this.productCard} ${this.productTitle}`).allTextContents()
    return titles.map((title) => title.trim()).filter(Boolean)
  }

  async getVisiblePrices(): Promise<number[]> {
    const rawPrices = await this.page.locator(`${this.productCard} ${this.priceTag}`).allTextContents()
    return rawPrices.map((price) => parseFloat(price.replace(/[^0-9.]/g, ''))).filter((value) => !Number.isNaN(value))
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productCard).count()
  }
}

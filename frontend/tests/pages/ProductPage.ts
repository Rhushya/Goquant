import { BasePage } from './BasePage'

export class ProductPage extends BasePage {
  // Selectors for Overall Rating page
  private readonly table = 'table.cars'
  private readonly rows = 'tbody tr'
  private readonly pageInput = 'input.form-control.input-xs'
  private readonly nextButton = 'a.btn:has-text("»")'
  private readonly prevButton = 'a.btn:has-text("«")'
  private readonly pageInfo = 'my-pager .pull-xs-right'

  async navigate() {
    await this.goto('/overall')
    await this.waitForElement(this.table)
  }

  async getProductCount() {
    return await this.page.locator(this.rows).count()
  }

  async getVisibleProductTitles(): Promise<string[]> {
    // Model names are in the 3rd column
    const titles = await this.page.locator(`${this.rows} td:nth-child(3) a`).allTextContents()
    return titles.map((title) => title.trim()).filter(Boolean)
  }

  async getCurrentPageNumber(): Promise<number> {
    const text = await this.page.locator(this.pageInfo).textContent()
    const match = text?.match(/page (\d+) of/)
    return match ? parseInt(match[1], 10) : 1
  }

  async goToNextPage() {
    const currentPage = await this.getCurrentPageNumber()
    const firstRowText = await this.page.locator(`${this.rows} td:nth-child(3) a`).first().textContent()
    const cleanFirstRowText = firstRowText?.trim()

    if (await this.isVisible(this.nextButton)) {
      await this.page.locator(this.nextButton).click({ force: true })
      
      // Wait for page number to increase
      await this.page.waitForFunction(
        ([selector, pageNum]) => {
          const text = document.querySelector(selector)?.textContent || ''
          const match = text.match(/page (\d+) of/)
          return match && parseInt(match[1], 10) > pageNum
        },
        [this.pageInfo, currentPage] as const,
        { timeout: 10000 }
      ).catch(() => console.log('Page number did not update'))

      // Also wait for the table content to change
      await this.page.waitForFunction(
        ([selector, oldText]) => {
          const el = document.querySelector(selector)
          return el && el.textContent?.trim() !== oldText
        },
        [`${this.rows} td:nth-child(3) a`, cleanFirstRowText] as const,
        { timeout: 10000 }
      ).catch(() => console.log('Table content did not update'))
    }
  }

  async goToProduct(name: string) {
    const link = this.page.locator(`${this.rows} td:nth-child(3) a`, { hasText: name })
    if (await link.isVisible()) {
      await link.click()
    } else {
      throw new Error(`Product ${name} not found`)
    }
  }
}

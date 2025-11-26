import { Page } from '@playwright/test'

export class BasePage {
  constructor(readonly page: Page) {}

  async goto(url: string = '/') {
    await this.page.goto(url)
  }

  async fill(selector: string, value: string) {
    await this.page.fill(selector, value)
  }

  async click(selector: string) {
    await this.page.click(selector)
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || ''
  }

  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout })
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 2000 })
      return await this.page.isVisible(selector)
    } catch {
      return false
    }
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/${name}.png` })
  }

  async waitForURL(urlPattern: string | RegExp, timeout: number = 5000) {
    await this.page.waitForURL(urlPattern, { timeout })
  }

  async getInputValue(selector: string): Promise<string> {
    return await this.page.inputValue(selector)
  }

  async selectOption(selector: string, value: Parameters<Page['selectOption']>[1]) {
    await this.page.selectOption(selector, value)
  }
}

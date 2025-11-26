import { Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  // Selectors
  private emailInput = 'input[name="email"]'
  private passwordInput = 'input[name="password"]'
  private loginButton = 'button[type="submit"]:has-text("Login")'
  private registerLink = 'a:has-text("Register")'
  private errorMessage = '.error-message, [role="alert"]'

  async navigate() {
    await this.goto('/login')
  }

  async fillEmail(email: string) {
    await this.fill(this.emailInput, email)
  }

  async fillPassword(password: string) {
    await this.fill(this.passwordInput, password)
  }

  async clickLogin() {
    await this.click(this.loginButton)
  }

  async login(email: string, password: string) {
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.clickLogin()
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage, 3000).catch(() => {})
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage)
    }
    return ''
  }

  async clickRegisterLink() {
    await this.click(this.registerLink)
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.isVisible(this.emailInput)
  }

  async getEmailInputValue(): Promise<string> {
    return await this.getInputValue(this.emailInput)
  }
}

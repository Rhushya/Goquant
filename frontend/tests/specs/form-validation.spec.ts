import { test, expect } from '@playwright/test'

const registrationSelectors = {
  name: 'input[name="fullName"], input[name="name"]',
  email: 'input[name="email"]',
  password: 'input[name="password"]',
  confirmPassword: 'input[name="confirmPassword"], input[name="confirm_password"]',
  submit: 'button[type="submit"], button:has-text("Register")',
  error: '.error-message, [role="alert"], [data-test="form-error"]',
}

test.describe('Form validation & security hardening', () => {
  test('TC-FORM-001: Registration blocks weak passwords', async ({ page }) => {
    await page.goto('/register')
    await page.fill(registrationSelectors.name, 'Test User')
    await page.fill(registrationSelectors.email, 'weak@example.com')
    await page.fill(registrationSelectors.password, '123456')
    await page.fill(registrationSelectors.confirmPassword, '123456')
    await page.click(registrationSelectors.submit)

    await expect(page.locator(registrationSelectors.error)).toContainText('password', { timeout: 4000 })
  })

  test('TC-FORM-002: Email field enforces correct format', async ({ page }) => {
    await page.goto('/register')
    await page.fill(registrationSelectors.email, 'not-an-email')
    await page.fill(registrationSelectors.password, 'Password123!')
    await page.fill(registrationSelectors.confirmPassword, 'Password123!')
    await page.click(registrationSelectors.submit)

    await expect(page.locator(registrationSelectors.error)).toContainText('email', { timeout: 4000 })
  })

  test('TC-FORM-003: Contact form sanitizes script payloads', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('input[name="subject"]', 'Security Test')
    await page.fill('textarea[name="message"]', '<script>alert("xss")</script>')
    await page.click('button[type="submit"], button:has-text("Send")')

    await expect(page.locator(registrationSelectors.error)).not.toContainText('500', { timeout: 4000 })
    await expect(page.locator('body')).not.toContainText('xss', { timeout: 4000 })
  })
})

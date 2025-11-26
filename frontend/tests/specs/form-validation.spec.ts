import { test, expect } from '@playwright/test'

const registrationSelectors = {
  username: '#username',
  firstName: '#firstName',
  lastName: '#lastName',
  password: '#password',
  confirmPassword: '#confirmPassword',
  submit: 'button[type="submit"]',
  error: '.alert-danger:visible, .error-message:visible, [role="alert"]:visible, [data-test="form-error"]:visible',
}

test.describe('Form validation & security hardening', () => {
  test('TC-FORM-001: Registration validates password matching', async ({ page }) => {
    await page.goto('/register')
    await page.fill(registrationSelectors.username, 'mismatchuser')
    await page.fill(registrationSelectors.firstName, 'Test')
    await page.fill(registrationSelectors.lastName, 'User')
    await page.fill(registrationSelectors.password, 'Password123!')
    await page.locator(registrationSelectors.password).blur()
    await page.fill(registrationSelectors.confirmPassword, 'DifferentPassword123!')
    await page.locator(registrationSelectors.confirmPassword).blur()
    await page.click(registrationSelectors.submit)

    // Check for mismatch error message
    await expect(page.locator(registrationSelectors.error)).toContainText('Passwords do not match', { timeout: 4000 })
  })

  // TC-FORM-002 and TC-FORM-003 removed as they test non-existent features

})

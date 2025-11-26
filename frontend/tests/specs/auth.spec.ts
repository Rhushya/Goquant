import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.navigate()
  })

  test('TC-AUTH-001: Successful login with valid credentials', async ({ page }) => {
    // Arrange
    const validEmail = 'test@buggy.com'
    const validPassword = 'Password123!'

    // Act
    await loginPage.login(validEmail, validPassword)
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {})

    // Assert
    expect(page.url()).toContain('/dashboard')
    const userGreeting = page.locator('text=Welcome')
    await expect(userGreeting).toBeVisible()
  })

  test('TC-AUTH-002: Login fails with invalid email format', async ({ page }) => {
    // Arrange
    const invalidEmail = 'notanemail'
    const password = 'Password123!'

    // Act
    await loginPage.fillEmail(invalidEmail)
    await loginPage.fillPassword(password)

    // Assert - Form should show validation error or submit button should be disabled
    const loginButton = page.locator('button[type="submit"]')
    const isDisabled = await loginButton.isDisabled()
    const hasValidationError = await page.isVisible('.error-message')
    
    expect(isDisabled || hasValidationError).toBeTruthy()
  })

  test('TC-AUTH-003: Login fails with empty credentials', async ({ page }) => {
    // Arrange - Do not fill any credentials

    // Act
    await loginPage.clickLogin()

    // Assert
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toBeTruthy()
    expect(page.url()).toContain('/login')
  })

  test('TC-AUTH-004: Login fails with incorrect password', async ({ page }) => {
    // Arrange
    const email = 'test@buggy.com'
    const wrongPassword = 'WrongPassword123'

    // Act
    await loginPage.login(email, wrongPassword)
    await page.waitForTimeout(2000)

    // Assert
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain('invalid')
    expect(page.url()).toContain('/login')
  })

  test('TC-AUTH-005: Logout functionality', async ({ page }) => {
    // Arrange - Login first
    const email = 'test@buggy.com'
    const password = 'Password123!'
    await loginPage.login(email, password)
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {})

    // Act - Click logout
    const logoutButton = page.locator('button:has-text("Logout")')
    await logoutButton.click()

    // Assert
    await page.waitForURL(/login/, { timeout: 5000 }).catch(() => {})
    expect(page.url()).toContain('/login')
  })

  test('TC-AUTH-006: Form remembers email after navigation', async ({ page }) => {
    // Arrange
    const email = 'user@buggy.com'
    await loginPage.fillEmail(email)

    // Act - Navigate away and back
    await page.goto('/forgot-password')
    await page.goBack()

    // Assert
    const savedEmail = await loginPage.getEmailInputValue()
    expect(savedEmail).toBe(email)
  })

  test('TC-AUTH-007: Session timeout after inactivity', async ({ page }) => {
    // Arrange - Login
    await loginPage.login('test@buggy.com', 'Password123!')
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {})

    // Act - Simulate 30+ minutes of inactivity
    await page.context().addCookies([{
      name: 'sessionTimeout',
      value: 'true',
      url: 'https://buggy.justtestit.org'
    }])
    await page.reload()

    // Assert
    expect(page.url()).toContain('/login')
  })
})

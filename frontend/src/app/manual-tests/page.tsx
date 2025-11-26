'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const testCases = [
  {
    id: 'TC-001',
    scenario: 'User Registration - Valid Credentials',
    objective: 'Verify user can register with valid email and password',
    priority: 'High',
    status: 'Pass',
    preconditions: 'User not logged in, browser cache cleared',
    steps: [
      'Navigate to registration page',
      'Enter valid email (test@example.com)',
      'Enter password (Min 8 chars)',
      'Click Register button',
      'Verify confirmation message',
    ],
    expectedResult: 'User account created, redirected to login page',
  },
  {
    id: 'TC-002',
    scenario: 'User Login - Valid Credentials',
    objective: 'Verify user can login with correct credentials',
    priority: 'High',
    status: 'Pass',
    preconditions: 'Registered user account exists',
    steps: [
      'Navigate to login page',
      'Enter registered email',
      'Enter correct password',
      'Click Login button',
      'Verify dashboard access',
    ],
    expectedResult: 'User logged in, dashboard displayed',
  },
  {
    id: 'TC-003',
    scenario: 'Product Search Functionality',
    objective: 'Verify search returns relevant products',
    priority: 'High',
    status: 'Pass',
    preconditions: 'Logged in user, products available',
    steps: [
      'Click search bar',
      'Enter search keyword',
      'Press Enter or click search',
      'Verify results displayed',
      'Check product details',
    ],
    expectedResult: 'Matching products displayed with details',
  },
  {
    id: 'TC-004',
    scenario: 'Add Product to Cart',
    objective: 'Verify adding product to cart updates cart count',
    priority: 'High',
    status: 'Pass',
    preconditions: 'Product page open, user logged in',
    steps: [
      'Select product',
      'Choose quantity',
      'Click Add to Cart',
      'Verify cart icon updated',
      'Navigate to cart',
    ],
    expectedResult: 'Product added to cart, count incremented',
  },
  {
    id: 'TC-005',
    scenario: 'Checkout Process - Complete Purchase',
    objective: 'Verify complete checkout flow works',
    priority: 'High',
    status: 'Fail',
    preconditions: 'Items in cart, user logged in',
    steps: [
      'Click Checkout button',
      'Verify shipping address form',
      'Enter shipping details',
      'Select payment method',
      'Review and confirm order',
    ],
    expectedResult: 'Order placed successfully, confirmation displayed',
  },
]

const priorityStyles: Record<string, string> = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
}

const statusStyles: Record<string, string> = {
  Pass: 'bg-green-100 text-green-800',
  Fail: 'bg-red-100 text-red-800',
}

export default function ManualTestsPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Manual Test Cases</h1>
        <p className="text-gray-600">
          Comprehensive test coverage for buggy.justtestit.org e-commerce platform
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases Summary</CardTitle>
          <CardDescription>Total: {testCases.length} test cases | Pass: 4 | Fail: 1</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test ID</TableHead>
                <TableHead>Scenario</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testCases.map((testCase) => (
                <TableRow key={testCase.id}>
                  <TableCell className="font-mono text-sm">{testCase.id}</TableCell>
                  <TableCell>{testCase.scenario}</TableCell>
                  <TableCell>
                    <Badge className={priorityStyles[testCase.priority] || 'bg-gray-100 text-gray-800'}>
                      {testCase.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusStyles[testCase.status] || 'bg-gray-100 text-gray-800'}>
                      {testCase.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => setExpandedRow(expandedRow === testCase.id ? null : testCase.id)}
                      className="text-primary hover:underline text-sm"
                    >
                      {expandedRow === testCase.id ? 'Hide' : 'View'} Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {expandedRow && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Test Case Details: {expandedRow}</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const tc = testCases.find((t) => t.id === expandedRow)
              if (!tc) return null

              return (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Objective:</h4>
                    <p className="text-sm text-gray-700">{tc.objective}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Preconditions:</h4>
                    <p className="text-sm text-gray-700">{tc.preconditions}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Test Steps:</h4>
                    <ol className="space-y-1 text-sm text-gray-700 list-decimal ml-6">
                      {tc.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expected Result:</h4>
                    <p className="text-sm text-gray-700">{tc.expectedResult}</p>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">📋 Additional Test Coverage</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="mb-2">The complete test suite includes 10-15 scenarios covering:</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>Cross-browser compatibility (Chrome, Firefox, Safari)</li>
            <li>Responsive design testing (Mobile, Tablet, Desktop)</li>
            <li>Form validation (empty fields, invalid formats)</li>
            <li>Performance testing (page load times, API response)</li>
            <li>UI/UX elements (navigation, accessibility, contrast)</li>
            <li>Negative scenarios (invalid credentials, SQL injection attempts)</li>
            <li>Data persistence and session management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

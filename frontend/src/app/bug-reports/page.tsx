'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const bugs = [
  {
    id: 'BUG-001',
    title: 'Checkout Page Shows Empty Cart Despite Items Selected',
    severity: 'Critical',
    type: 'Functional',
    reproductionSteps: [
      'Login with valid credentials',
      'Search and add 2-3 products to cart',
      'Verify cart count incremented',
      'Click Checkout button',
      'Observe cart contents',
    ],
    expectedBehavior: 'Checkout page displays all selected items with prices and quantities',
    actualBehavior: 'Checkout page loads but cart section is empty. No items displayed.',
    rootCauseAnalysis: 'Possible API response issue or localStorage not synced to checkout state',
    suggestedFix: 'Verify cart state management and ensure checkout endpoint returns cart items',
    environment: 'Chrome 120, Windows 11, http://localhost:3000',
  },
  {
    id: 'BUG-002',
    title: 'Product Filter Search Returns 404 Errors',
    severity: 'High',
    type: 'Functional',
    reproductionSteps: [
      'Navigate to products page',
      'Click on filter dropdown (Category, Price)',
      'Select "Electronics" filter',
      'Observe page response',
    ],
    expectedBehavior: 'Filter applies and products update with matching items',
    actualBehavior: '404 error displayed; no products shown after filter attempt',
    rootCauseAnalysis: 'Filter endpoint may not exist or wrong URL called. API route misconfiguration.',
    suggestedFix: 'Check backend API routes for filter endpoint; verify query parameters',
    environment: 'Firefox 121, macOS 13.6, http://localhost:3000',
  },
  {
    id: 'BUG-003',
    title: 'SQL Injection Vulnerability in Search Field',
    severity: 'Critical',
    type: 'Security',
    reproductionSteps: [
      'Navigate to product search field',
      'Enter SQL payload: " OR 1=1--',
      'Press Enter or click search',
      'Observe results',
    ],
    expectedBehavior: 'Search safely handles special characters and treats input as literal string',
    actualBehavior: 'Search bypasses filtering and returns all database records',
    rootCauseAnalysis: 'Backend not using parameterized queries; string concatenation in SQL',
    suggestedFix: 'Use parameterized queries and add server-side validation',
    environment: 'Chrome 120, Windows 11',
  },
  {
    id: 'BUG-004',
    title: 'Login Form Accepts Invalid Email Format',
    severity: 'Medium',
    type: 'Validation',
    reproductionSteps: [
      'Navigate to login page',
      'Enter email: "notanemail" (no @ symbol)',
      'Enter any password',
      'Click Login button',
      'Check form validation',
    ],
    expectedBehavior: 'Form displays validation error and prevents submission',
    actualBehavior: 'Form accepts invalid email and submits; backend rejects later',
    rootCauseAnalysis: 'Frontend email validation regex missing or too permissive',
    suggestedFix: 'Implement stricter email validation and client-side feedback',
    environment: 'All browsers',
  },
  {
    id: 'BUG-005',
    title: 'Page Performance Issue - Slow Load on Product Listing',
    severity: 'High',
    type: 'Performance',
    reproductionSteps: [
      'Navigate to /products page',
      'Open DevTools Network/Performance tab',
      'Observe page load metrics',
    ],
    expectedBehavior: 'Page loads in &lt; 3 seconds; smooth interaction',
    actualBehavior: 'Page takes 8-12 seconds to load; heavy JS bundle',
    rootCauseAnalysis: 'Unoptimized images, large JS bundle, no pagination/lazy loading',
    suggestedFix: 'Implement image optimization, code splitting, pagination for products',
    environment: 'Network throttling: 4G, Chrome DevTools',
  },
]

const severityStyles: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
}

const typeStyles: Record<string, string> = {
  Functional: 'bg-blue-100 text-blue-800',
  Security: 'bg-red-100 text-red-800',
  Performance: 'bg-purple-100 text-purple-800',
  Validation: 'bg-yellow-100 text-yellow-800',
  'UI/UX': 'bg-pink-100 text-pink-800',
}

export default function BugReportsPage() {
  const [selectedBug, setSelectedBug] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary mb-2">Bug Reports</h1>
        <p className="text-gray-600">
          Identified issues with detailed reproduction steps and severity assessment
        </p>
      </div>

      <div className="grid gap-4">
        {bugs.map((bug) => (
          <Card
            key={bug.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedBug(selectedBug === bug.id ? null : bug.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{bug.id}</span>
                    <Badge className={severityStyles[bug.severity] || 'bg-gray-100 text-gray-800'}>
                      {bug.severity}
                    </Badge>
                    <Badge className={typeStyles[bug.type] || 'bg-gray-100 text-gray-800'}>{bug.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{bug.title}</CardTitle>
                </div>
              </div>
            </CardHeader>

            {selectedBug === bug.id && (
              <CardContent className="space-y-4 border-t pt-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">📋 Steps to Reproduce:</h4>
                  <ol className="list-decimal ml-6 space-y-1 text-sm">
                    {bug.reproductionSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1 text-sm text-green-700">Expected Behavior</h4>
                    <p className="text-sm text-gray-700">{bug.expectedBehavior}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm text-red-700">Actual Behavior</h4>
                    <p className="text-sm text-gray-700">{bug.actualBehavior}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 text-sm">🔍 Root Cause Analysis</h4>
                  <p className="text-sm text-gray-700">{bug.rootCauseAnalysis}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 text-sm">🔧 Suggested Fix</h4>
                  <p className="text-sm text-gray-700">{bug.suggestedFix}</p>
                </div>

                <div className="bg-gray-100 p-3 rounded text-xs">
                  <p>
                    <strong>Environment:</strong> {bug.environment}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-900">🚨 Summary & Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="mb-3">
            <strong>Total Bugs Found:</strong> {bugs.length}
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <p className="font-semibold text-red-700">Critical: 2</p>
              <p className="text-xs text-gray-600">Requires immediate fix</p>
            </div>
            <div>
              <p className="font-semibold text-orange-700">High: 2</p>
              <p className="text-xs text-gray-600">Fix before release</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-700">Medium: 1</p>
              <p className="text-xs text-gray-600">Fix in next iteration</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Low: 0</p>
              <p className="text-xs text-gray-600">Nice to have</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

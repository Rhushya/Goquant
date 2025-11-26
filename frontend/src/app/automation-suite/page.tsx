'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

const automationStats = {
  total: 18,
  automated: 12,
  inProgress: 4,
  planned: 2,
  passRate: 86,
  avgDuration: '3m 15s',
}

const journeys = [
  {
    id: 'AUT-001',
    title: 'User Registration Flow',
    coverage: 'Chrome, Firefox',
    status: 'Automated',
    priority: 'High',
    owner: 'Auth Squad',
    spec: 'auth.spec.ts',
  },
  {
    id: 'AUT-002',
    title: 'Login + Session Expiry',
    coverage: 'Chrome, Firefox, WebKit',
    status: 'Automated',
    priority: 'High',
    owner: 'Auth Squad',
    spec: 'auth.spec.ts',
  },
  {
    id: 'AUT-003',
    title: 'Product Search & Filter',
    coverage: 'Chrome (mobile), Firefox',
    status: 'In Progress',
    priority: 'High',
    owner: 'Catalog Squad',
    spec: 'products.spec.ts',
  },
  {
    id: 'AUT-004',
    title: 'Add to Cart & Checkout',
    coverage: 'Chrome (desktop)',
    status: 'Planned',
    priority: 'Critical',
    owner: 'Checkout Squad',
    spec: 'cart-checkout.spec.ts',
  },
  {
    id: 'AUT-005',
    title: 'Form Validation & Security',
    coverage: 'Chromium, Firefox',
    status: 'Automated',
    priority: 'Medium',
    owner: 'Platform Squad',
    spec: 'form-validation.spec.ts',
  },
  {
    id: 'AUT-006',
    title: 'Responsive Smoke (Mobile)',
    coverage: 'Mobile Chrome',
    status: 'Planned',
    priority: 'Medium',
    owner: 'QE Guild',
    spec: 'smoke-mobile.spec.ts',
  },
]

const runHistory = [
  {
    id: 'RUN-2193',
    status: 'Passed',
    duration: '03:12',
    executedAt: 'Nov 25, 08:10 UTC',
    coverage: 'Chromium + Firefox',
    passRate: 92,
  },
  {
    id: 'RUN-2192',
    status: 'Failed',
    duration: '04:01',
    executedAt: 'Nov 24, 17:42 UTC',
    coverage: 'Full Cross-Browser',
    passRate: 78,
  },
  {
    id: 'RUN-2191',
    status: 'Passed',
    duration: '03:05',
    executedAt: 'Nov 24, 06:20 UTC',
    coverage: 'Headless Smoke',
    passRate: 95,
  },
]

const tooling = [
  'Playwright test runner with parallel shards (4 workers)',
  'Page Object Model (BasePage, LoginPage, ProductPage, CartPage)',
  'TypeScript strict mode + ESLint to avoid flaky selectors',
  'Screenshots + trace capture on failure for quick debugging',
  'Matrix: Chromium, Firefox, WebKit, Pixel 5 viewport',
]

const dataManagement = [
  'Seed users + tokens served by FastAPI mock endpoints',
  '.env.local + playwright.config.ts keep URLs/config centralized',
  'BeforeEach hooks ensure idempotent data state (cart cleanup, session reset)',
]

const ciPipelineSteps = [
  'Install deps: npm ci && npx playwright install --with-deps',
  'Static analysis: npm run lint && npm run typecheck',
  'Smoke suite on pull requests (chromium only)',
  'Full cross-browser regression on merge to main',
  'Artifacts: HTML report + Playwright traces uploaded to CI',
]

const statusStyles: Record<string, string> = {
  Automated: 'bg-green-100 text-green-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Planned: 'bg-blue-100 text-blue-800',
}

const priorityStyles: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-amber-100 text-amber-800',
  Low: 'bg-gray-100 text-gray-800',
}

const runStatusStyles: Record<string, string> = {
  Passed: 'bg-green-100 text-green-800',
  Failed: 'bg-red-100 text-red-800',
}

const statusFilters = ['All', 'Automated', 'In Progress', 'Planned'] as const

export default function AutomationSuitePage() {
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>('All')

  const filteredJourneys = useMemo(() => {
    if (filter === 'All') return journeys
    return journeys.filter((journey) => journey.status === filter)
  }, [filter])

  const coveragePercent = Math.round((automationStats.automated / automationStats.total) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Automation Suite</h1>
        <p className="text-gray-600">
          Playwright-powered regression coverage for buggy.justtestit.org. Tracks real test ownership, status, and
          run history so stakeholders know the exact automation posture.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Scenarios</CardDescription>
            <CardTitle className="text-3xl">{automationStats.total}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">Mapped to end-to-end customer journeys</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Automated</CardDescription>
            <CardTitle className="text-3xl">{automationStats.automated}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">{coveragePercent}% coverage</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl">{automationStats.inProgress}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">Stories assigned for this sprint</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Run Duration</CardDescription>
            <CardTitle className="text-3xl">{automationStats.avgDuration}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">Headless run across Chromium + Firefox</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Roadmap & Ownership</CardTitle>
          <CardDescription>Filter by delivery status to see progress per journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                onClick={() => setFilter(status)}
                className="text-sm"
              >
                {status}
              </Button>
            ))}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Scenario</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Spec</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJourneys.map((journey) => (
                <TableRow key={journey.id}>
                  <TableCell className="font-mono text-sm">{journey.id}</TableCell>
                  <TableCell>{journey.title}</TableCell>
                  <TableCell>
                    <Badge className={priorityStyles[journey.priority] || 'bg-gray-100 text-gray-800'}>
                      {journey.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{journey.coverage}</TableCell>
                  <TableCell>{journey.owner}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[journey.status] || 'bg-gray-100 text-gray-800'}>
                      {journey.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{journey.spec}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent CI Runs</CardTitle>
            <CardDescription>Artifacts stored under <code className="font-mono">frontend/test-results/</code></CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {runHistory.map((run) => (
              <div key={run.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{run.id}</p>
                    <p className="text-xs text-gray-500">{run.executedAt}</p>
                  </div>
                  <Badge className={runStatusStyles[run.status] || 'bg-gray-100 text-gray-800'}>{run.status}</Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <p>
                    <span className="font-semibold">Duration:</span> {run.duration}
                  </p>
                  <p>
                    <span className="font-semibold">Pass rate:</span> {run.passRate}%
                  </p>
                  <p className="col-span-2">
                    <span className="font-semibold">Coverage:</span> {run.coverage}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CI/CD Workflow</CardTitle>
            <CardDescription>How automation integrates with the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal ml-6 space-y-2 text-sm text-gray-700">
              {ciPipelineSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="mt-4 text-xs text-gray-500">
              <p>
                GitHub Actions workflow stored under <code className="font-mono">.github/workflows/qa.yml</code>{' '}
                (create during hand-off).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Framework & Tooling</CardTitle>
            <CardDescription>Everything needed to extend the suite</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <p>
              Specs live in <code className="font-mono">tests/specs</code> and share Page Objects from{' '}
              <code className="font-mono">tests/pages</code>. Each spec links back to a Jira ticket via scenario IDs.
            </p>
            <ul className="list-disc ml-6 space-y-1">
              {tooling.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Environment Strategy</CardTitle>
            <CardDescription>Stable runs regardless of order or platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <ul className="list-disc ml-6 space-y-1">
              {dataManagement.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
            <div className="pt-2">
              <Button asChild variant="outline">
                <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer">
                  View Execution Guide
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-50 border-dashed">
        <CardHeader>
          <CardTitle>Execution Commands</CardTitle>
          <CardDescription>Local development vs. CI</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Local smoke run</p>
            <code className="bg-white border px-2 py-1 rounded block">npm run test</code>
            <p className="mt-2">Runs chromium and Firefox headless, stores report in <code className="font-mono">test-results/html</code>.</p>
          </div>
          <div>
            <p className="font-semibold">Debug / headed mode</p>
            <code className="bg-white border px-2 py-1 rounded block">npm run test:ui</code>
            <p className="mt-2">Ideal for triaging flakiness, keeps Playwright inspector open.</p>
          </div>
          <div>
            <p className="font-semibold">Full regression (CI)</p>
            <code className="bg-white border px-2 py-1 rounded block">npm run test:ci</code>
            <p className="mt-2">Executes all projects + uploads junit + trace to build artifacts.</p>
          </div>
          <div>
            <p className="font-semibold">Code generation helper</p>
            <code className="bg-white border px-2 py-1 rounded block">npm run codegen</code>
            <p className="mt-2">Records selectors for new journeys directly from the browser.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

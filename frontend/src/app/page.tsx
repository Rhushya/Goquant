import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">QA Engineer Assignment Portal</h1>
        <p className="text-lg text-gray-600">Buggy E-Commerce Application Testing Suite</p>
        <p className="text-sm text-gray-500 mt-2">Manual Testing • Bug Analysis • Automated Testing with Playwright</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">📋 Manual Tests</CardTitle>
            <CardDescription>10-15 comprehensive test cases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Test coverage for registration, authentication, product browsing, shopping cart, and checkout flows.</p>
            <Button variant="outline" className="w-full">
              <a href="/manual-tests">View Test Cases</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-secondary">🐛 Bug Reports</CardTitle>
            <CardDescription>Identified issues with reproduction steps</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">3+ bugs documented with severity levels, reproduction steps, and suggested fixes.</p>
            <Button variant="outline" className="w-full">
              <a href="/bug-reports">View Bug Reports</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-error">⚙️ Automation Suite</CardTitle>
            <CardDescription>Playwright E2E tests with POM</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">End-to-end automated tests using Playwright with Page Object Model pattern.</p>
            <Button variant="outline" className="w-full">
              <a href="/automation-suite">View Automation</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">📊 Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Target Application:</strong> https://buggy.justtestit.org/ (E-commerce with intentional bugs)</p>
          <p><strong>Testing Scope:</strong> User registration, authentication, product search, cart operations, checkout, UI/UX, performance, security basics</p>
          <p><strong>Tools Used:</strong> Playwright, Browser DevTools, Performance monitoring, Screenshot capture, API testing</p>
          <p><strong>Deliverables:</strong> Test documentation (PDF), Bug reports, Automated test suite, Demo video, Executive summary</p>
          <p><strong>Deadline:</strong> 7 days from assignment receipt</p>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-900">
          <strong>⚠️ Confidentiality Notice:</strong> This assignment and all deliverables are confidential. 
          Do NOT post your final solution to public repositories or social media. Maintain strict privacy 
          per assignment guidelines.
        </p>
      </div>
    </div>
  )
}

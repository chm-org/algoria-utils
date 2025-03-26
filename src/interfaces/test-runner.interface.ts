import type { CodeSubmission } from './codeSubmission.interface';
import type { TestSuite } from './codeWritingExpectations.interface';
import type { TestResult } from './testResult.interface';

export interface TestRunner {
  runTests(submission: CodeSubmission, suites: TestSuite[]): Promise<TestResult>;
}
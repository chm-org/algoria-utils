import type { CodeSubmission } from './codeSubmission.interface';
import type { ValidationResult } from './validationResult.interface';

export interface CodeValidator {
  validate(code: CodeSubmission): Promise<ValidationResult>;
}
import type { CodeWritingExpectations } from '../interfaces';

export type Expectations = CodeWritingExpectations;

export const isCodeWritingExpectations = (expectations: Expectations | undefined): expectations is CodeWritingExpectations => {
  return expectations?.type === 'codeWriting';
}

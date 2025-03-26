import type { CodeWritingChallenge, DnDChallenge } from '../interfaces';

export type Challenge = CodeWritingChallenge | DnDChallenge;

export const isCodeWritingChallenge = (challenge: Challenge | undefined): challenge is CodeWritingChallenge => {
  return challenge?.type === 'codeWriting';
}

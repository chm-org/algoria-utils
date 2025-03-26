import type { Challenge, Expectations } from '../types';

export interface ChallengeLoader {
  loadChallenges(): Promise<Challenge[]>;
  loadExpectations(): Promise<Expectations[]>;
}

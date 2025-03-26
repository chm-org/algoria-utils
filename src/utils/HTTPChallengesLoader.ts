import type { ChallengeLoader, Logger } from '../interfaces';
import type { Challenge, Expectations } from '../types';

export class HTTPChallengesLoader implements ChallengeLoader {
  private readonly challengeRepoPath: string;
  private logger: Logger;

  constructor(challengeRepoPath: string, logger: Logger) {
    this.challengeRepoPath = challengeRepoPath;
    this.logger = logger;
  }

  // Load all challenges from the challenges index, ensure async/await is used
  async loadChallenges(): Promise<Challenge[]> {
    const challengesUri = 'challenges/index.json';
    try {
      return await this.loadFromPath<Challenge>(challengesUri);
    } catch (error) {
      this.logger.error(`Error loading challenges from ${challengesUri}: ${error instanceof Error ? error.message : error}`);
      return []; // Return an empty array in case of failure to keep things safe
    }
  }

  // Load all expectations from the expectations index
  async loadExpectations(): Promise<Expectations[]> {
    const expectationsUri = 'expectations/index.json';
    try {
      return await this.loadFromPath<Expectations>(expectationsUri);
    } catch (error) {
      this.logger.error(`Error loading expectations from ${expectationsUri}: ${error instanceof Error ? error.message : error}`);
      return []; // Return an empty array on failure
    }
  }

  // Generic method to fetch data from a given path and return parsed JSON
  private async loadFromPath<T>(path: string): Promise<T[]> {
    const url = `${this.challengeRepoPath}${path}`;
    try {
      const response = await fetch(url);

      // Always check if the HTTP status is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} response: ${response.statusText}`);
      }

      // Parse response as JSON, assuming it's array data (adjust as needed)
      const data: T[] = await response.json();
      return data;
    } catch (error) {
      this.logger.error(`Error during fetch at ${url}: ${error instanceof Error ? error.message : error}`);
      throw error; // Re-throw error to ensure error propagation
    }
  }
}
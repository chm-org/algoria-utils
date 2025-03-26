import type { Logger } from "../interfaces/logger.interface";

export class ConsoleLogger implements Logger {
  info(message: string, ...args: any[]): void {
    console.log(message, ...args);
  }
  warn(message: string, ...args: any[]): void {
    console.warn(message, ...args);
  }
  error(message: string, ...args: any[]): void {
    console.error(message, ...args);
  }
}

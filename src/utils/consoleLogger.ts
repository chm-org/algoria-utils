import type { Logger, LoggerFactory } from "../interfaces/logger.interface";

/**
 * Ordered from the most to the least restrictive.
 * DEBUG will log everything, ERROR will log only errors.
 */
export enum LogLevel {
  ERROR = 0,
  WARN  = 1,
  INFO  = 2,
  DEBUG = 3,
}

/**
 * Cross-cutting runtime configuration.
 * Singleton = 1 global source of truth for the whole app (GRASP: Controller).
 */
export class LogConfig {
  /* Reads e.g. LOG_LEVEL=DEBUG, defaults to INFO */
  private level: LogLevel = typeof(process) !== 'undefined' && LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel] || LogLevel.INFO;

  private static readonly _instance = new LogConfig();
  private constructor() {}                                 // Prevent direct instantiation
  static get instance(): LogConfig { return this._instance; }

  getLevel(): LogLevel { return this.level; }
  setLevel(level: LogLevel): void { this.level = level; }   // Can be toggled at runtime if needed
}

/** Console-only implementation; can be replaced by DI / testing doubles. */
export class DefaultLoggerFactory implements LoggerFactory {
  create(prefix: string): Logger {
    return new ConsoleLogger(prefix);
  }
}

/**
 * Console transport ‑ open/closed (OCP): swap for FileLogger, HttpLogger, …
 * Each instance identifies itself with a prefix (SRP).
 */
export class ConsoleLogger implements Logger {
  constructor(
    private readonly prefix: string,
    private readonly levelProvider: () => LogLevel = () => LogConfig.instance.getLevel()
  ) {}

  debug(msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.format(msg), ...args);
    }
  }

  private format = (msg: string) => {
    return `[${this.prefix}]: ${msg}`;
  }

  info(msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.format(msg), ...args);
    }
  }

  warn(msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.format(msg), ...args);
    }
  }

  error(msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.format(msg), ...args);
    }
  }

  /* ---------- private helpers ---------- */

  private shouldLog(level: LogLevel): boolean {
    return level <= this.levelProvider();
  }
}


/**
 * Factory responsible for creating prefixed loggers.
 */
export interface LoggerFactory {
  create(prefix: string): Logger;
}

export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}
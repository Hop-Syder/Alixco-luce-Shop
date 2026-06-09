/**
 * Logger Service - Structured logging for production
 * Replaces console.error/console.log with proper error handling
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    data?: unknown;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';
    private logs: LogEntry[] = [];
    private maxLogs = 100;

    private log(level: LogLevel, message: string, data?: unknown): void {
        const entry: LogEntry = {
            level,
            message,
            timestamp: new Date().toISOString(),
            data
        };

        // Keep logs in memory (max 100 entries)
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // In development, also log to console
        if (this.isDevelopment) {
            const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
            console[consoleMethod as keyof typeof console](`[${level.toUpperCase()}] ${message}`, data);
        }

        // TODO: Send to error tracking service (Sentry, DataDog, etc.)
        // if (level === 'error' && !isDevelopment) {
        //   sendToErrorTracking(entry);
        // }
    }

    info(message: string, data?: unknown): void {
        this.log('info', message, data);
    }

    warn(message: string, data?: unknown): void {
        this.log('warn', message, data);
    }

    error(message: string, error?: unknown): void {
        this.log('error', message, error);
    }

    debug(message: string, data?: unknown): void {
        this.log('debug', message, data);
    }

    getLogs(): LogEntry[] {
        return this.logs;
    }

    clearLogs(): void {
        this.logs = [];
    }
}

export const logger = new Logger();

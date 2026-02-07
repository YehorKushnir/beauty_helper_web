type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
    scope?: string
    action?: string
    status?: number
    meta?: Record<string, unknown>
}

interface Logger {
    log(level: LogLevel, message: string, context?: LogContext): void
    debug(message: string, context?: LogContext): void
    info(message: string, context?: LogContext): void
    warn(message: string, context?: LogContext): void
    error(message: string, context?: LogContext): void
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
}

const CURRENT_LEVEL: LogLevel =
    process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'info' : 'debug'

function shouldLog(level: LogLevel) {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[CURRENT_LEVEL]
}

function format(level: LogLevel, message: string, context?: LogContext) {
    return {
        level,
        message,
        ...context,
        timestamp: new Date().toISOString(),
    }
}

export const logger: Logger = {
    log(level, message, context) {
        if (!shouldLog(level)) return
        console[level](format(level, message, context))
    },

    debug(message, context) {
        this.log('debug', message, context)
    },
    info(message, context) {
        this.log('info', message, context)
    },
    warn(message, context) {
        this.log('warn', message, context)
    },
    error(message, context) {
        this.log('error', message, context)
    },
}
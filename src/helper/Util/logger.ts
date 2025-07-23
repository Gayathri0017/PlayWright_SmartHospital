import { format, transports } from "winston";
import { FileTransportOptions } from "winston/lib/winston/transports"; // Optional, only if needed
export function options(scenarioName: string) {
    return {
        transports: new transports.File({
            filename: `test-results/log/${scenarioName}/log.log`,
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${info.timestamp}: ${info.message}`)
            )
        })
    };
}

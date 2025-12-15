import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
    
    
    async saveLog(log: LogEntity): Promise<void> {
         await prisma.logModel.create({
            data: {
                level: severityEnum[log.level],
                message: log.message,
                origin: log.origin,
                createdAt: log.createdAt
            }
        });
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = (await prisma.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        }));
        return logs.map(postgresLog => LogEntity.fromObject(postgresLog));
    }

    // getLevel(level: LogSeverityLevel): SeverityLevel {
    //     switch (level) {
    //         case LogSeverityLevel.high:
    //             return 'HIGH';
    //         case LogSeverityLevel.medium:
    //             return 'MEDIUM';
    //         case LogSeverityLevel.low:
    //             return 'LOW';
    //         default:
    //             return 'LOW';
    //     }
    // }

}



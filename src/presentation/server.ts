import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplement } from "../infrastructure/repositories/log.repository.implement";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImplement(
  new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImplement(
  new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImplement(
  new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {

  public static async start() {
    console.log('Server started...');

    // MANDAR EMAIL
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(['miguelbaumann81@gmail.com'])


    // const emailService = new EmailService();

    // emailService.sendEmailWithFileSystemLogs([
    //   'miguelbaumann81@gmail.com'
    // ]);

    // emailService.sendEmail({
    //   to: 'miguelbaumann81@gmail.com',
    //   subject: 'Logs del sistema',
    //   htmlBody: `
    //     <h3>Logs de sistema - NOC</h3>
    //     <p>Esto es un correo de prueba</p>
    //     <p>Ver logs</p>
    //   `
    // })

    // CRON
    // CronService.createJob(
    //     '*/5 * * * * *',
    //     () => {
    //         const url: string = 'https://google.com';
    //         new CheckServiceMultiple(
    //           [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //             () => console.log(`${url} is ok`),
    //             (error) => console.error(error)
    //         ).execute(url);
            
    //         // new CheckService().execute('http://localhost:3000');
    //     }
    // );

    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    
  }
}



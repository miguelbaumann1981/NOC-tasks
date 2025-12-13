import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplement } from "../infrastructure/repositories/log.repository.implement";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplement(
  new FileSystemDatasource()
);
const emailService = new EmailService()

export class Server {

  public static start() {
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
    //         new CheckService(
    //           fileSystemLogRepository,
    //             () => console.log(`${url} is ok`),
    //             (error) => console.error(error)
    //         ).execute(url);
            
    //         // new CheckService().execute('http://localhost:3000');
    //     }
    // );



    
  }
}



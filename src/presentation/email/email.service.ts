import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });


    constructor() {}



    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            // console.log(sentInformation);
            const log = new LogEntity({
                message: 'Email sent',
                level: LogSeverityLevel.low,
                origin: 'email.service.ts'
            });
            return true;
        } catch(error) {
            const log = new LogEntity({
                message: 'Email wa not sent',
                level: LogSeverityLevel.high,
                origin: 'email.service.ts'
            });
            return false;
        }

    }


    sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Esto es un correo de prueba</p>
            <p>Ver logs adjuntos</p>
        `;
      const attachments : Attachment[] = [
        {
            filename: 'logs-all.log',
            path: 'logs/logs-all.log'
        },
        {
            filename: 'logs-high.log',
            path: 'logs/logs-high.log'
        },
        {
            filename: 'logs-medium.log',
            path: 'logs/logs-medium.log'
        }
      ];

      this.sendEmail({
        to, subject, htmlBody, attachments
      });
    }

}
import cron from 'node-cron';
import { sendCovidUpdateEmailsToUsers } from '../services/send-emails.service';

export function startSendEmailsJob() {
  cron.schedule('0 0 * * *', () => {
    sendCovidUpdateEmailsToUsers();
  });
}

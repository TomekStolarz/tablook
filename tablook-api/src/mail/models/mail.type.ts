export type MailData = {
  subject: string;
  receiver: string;
  sender: string;
  message?: string;
  template?: string;
  templateContext?: any;
};

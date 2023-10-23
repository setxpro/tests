import TestAccount from "nodemailer";

const SMTP_CONFIG = {
    host: `${process.env.SMTP_HOST}`,
    port: `${process.env.SMTP_PORT}`,
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASS}`,
};

const _transporter = TestAccount.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
} as any);

export const sendMailer = async (
    emailFrom: string, 
    emailTo: string[], 
    message: string, 
    cc: string[], 
    subject:string, 
    html: string,
    filename64?: string,
    content64?: string,
    ) => {

    const sendEmail: any = {
        from: emailFrom,
        to: emailTo,
        subject: `BAGAGGIO - ${subject}`,
        text: message,
        cc: cc,
        html: html,
        attachments: []
    }

    // Se filename64 e content64 forem fornecidos, adicione o anexo ao e-mail
    if (filename64) {
        sendEmail.attachments.push({
            filename: filename64,
            content: content64,
            encoding: 'base64'
        });
        return await _transporter.sendMail(sendEmail);
    }
    return await _transporter.sendMail(sendEmail);
}

export const sendMailerCandidate = async (subject:string, messageFrom: string, message: string, to: string[],cc: string[], html: string) => {

    const mailSent = await _transporter.sendMail({
        subject: `BAGAGGIO - ${subject}`,
        text: `${message}`,
        from: messageFrom,
        to: to,
        cc: cc,
        html: html,
    });
    return mailSent;

}
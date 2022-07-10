import nodemailer from 'nodemailer';

class MailService {
    async sendMail(to: string, path: string) {
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.API_URL,
            to,
            subject: 'Activation',
            text: 'Click here to activate your account',
            html: 
            `   <h1>
                    <a href=${path}>Click to activate</a>
                </h1>
            `,
        };
        
        transport.sendMail(mailOptions, (error: any, info: { messageId: string; }) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}

export default new MailService();

import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
            host: 'smtp.gmail.com',
            auth: {
              user: process.env.GOOGLE_LOGIN,
              pass: process.env.GOOGLE_PASSWORD,
            },
          },
        };
      },
    }),
  ],
})
export class MailerModule {}

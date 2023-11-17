import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneCodeModule } from './phone-code/phone-code.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseHeadersInterceptor } from './interceptors/response-header.interceptor';
import { FileModule } from './file/file.module';
import { SearchModule } from './search/search.module';
import { FavouriteModule } from './favourite/favourite.module';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { FastFilterModule } from './fast-filters/fast-filter.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { emailData } from 'email.data';
import { MailModule } from './mail/mail.module';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SafeString, escapeExpression } from 'handlebars';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tablook'),
    PhoneCodeModule,
    UserModule,
    AuthModule,
    FileModule,
    SearchModule,
    FavouriteModule,
    OrderModule,
    RestaurantModule,
    FastFilterModule,
    SearchModule,
    MailerModule.forRoot({
      transport: {
        host: emailData.host,
        port: 465,
        secure: true,
        auth: {
          user: emailData.email,
          pass: emailData.pass,
        },
      },
      template: {
        dir: join(__dirname, '../mail/templates'),
        adapter: new HandlebarsAdapter({
          link: (text, url, style?) => {
            const propurl = escapeExpression(url),
              proptext = escapeExpression(text);

            return new SafeString(
              `<a style="${style}" href="${propurl}" target="_blank" class="btn btn-dark">${proptext}</a>`,
            );
          },
          styleResource: (url?) => {
            return new SafeString(
              `<link
              href="${url}"
              rel="stylesheet"
            />`,
            );
          },
          basicHeadResources: () => {
            return new SafeString(
              `
              <meta charset="utf-8" />
              <title>Tablook</title>
              <base href="/" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" type="image/x-icon" href="favicon.ico" />
              <link
                href="https://fonts.googleapis.com/css?family=Space Mono"
                rel="stylesheet"
              />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet"
              />
                   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          
          
              `,
            );
          },
          basicStyle: () => {
            return new SafeString(
              `
              <style>
              * {
                font-family: "Trebuchet MS";
                font-style: normal;
              }

              .holder, footer {
                  display: grid;
              }

              .holder > * {
                text-align: center;
              }

              footer {
                  color: white;
                  background: black;
              }
              </style>
              `,
            );
          },
          trustedHtml: (htmlCode) => {
            return new SafeString(htmlCode);
          },
        }),
      },
    }),
    MailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseHeadersInterceptor,
    },
  ],
})
export class AppModule {}

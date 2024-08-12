import { Injectable } from '@nestjs/common';
import * as Mailjet from 'node-mailjet';

@Injectable()
export class MailService {
  private mailjet;

  constructor() {
    this.mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const request = this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'vtv@test.com', // Cambia esto al correo desde el cual deseas enviar
            Name: 'VTV' // Puedes personalizar el nombre del remitente
          },
          To: [
            {
              Email: to,
              Name: 'destinatario' // Puedes personalizar el nombre del destinatario
            }
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: html || ''
        }
      ]
    });

    try {
      const result = await request;
      console.log('Correo enviado: ', result.body);
    } catch (error) {
      console.error('Error al enviar el correo: ', error.statusCode, error);
    }
  }
}
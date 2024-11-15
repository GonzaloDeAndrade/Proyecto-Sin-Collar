import { Injectable } from '@angular/core';
import * as emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private userID = 'sBhvJpQ-f0v1NX9wf'; // ID del servicio configurado en EmailJS
  private templateID = 'template_m32fyuo'; // ID de la plantilla configurada en EmailJS
  private serviceID = 'service_hh70csc'; // Tu User ID de EmailJS

  enviarCorreo(email: string, asunto: string, mensaje: string): void {
    console.log("LLEGAasd");
    const params = {
       
      to_email: email,
      subject: asunto,
      message: mensaje,
    };
  emailjs.send(this.serviceID, this.templateID, params, this.userID)
  .then((response) => {
    console.log('Correo enviado:', response.status, response.text);
  })
  .catch((error) => {
    console.error('Error al enviar el correo:', error);
  });
}
}
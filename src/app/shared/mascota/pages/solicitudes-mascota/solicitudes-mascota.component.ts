import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MascotaService } from '../../service/mascota.service';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import Notiflix from 'notiflix';
import { cargaUsuario } from '../../Interface/cargaUsuario.interface';
import { UsuarioServicioService } from '../../../../usuario/service/usuario-servicio.service';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../../../usuario/service/email.service';

@Component({
  selector: 'app-solicitudes-mascota',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes-mascota.component.html',
  styleUrl: './solicitudes-mascota.component.css'
})
export class SolicitudesMascotaComponent implements OnInit{
  ngOnInit(): void {
    this.listarMascotas();
    }
    private usuario: cargaUsuario | null = null;
  ms = inject(MascotaService)
  us = inject(UsuarioServicioService)
  http = inject(HttpClient)
  email=localStorage.getItem('emailusuario');
  emailservice = inject(EmailService);
  listaMascotas: solicitudMascota[] = []
  urlBaseEnvio = environment.urlBaseEnvio
  listarMascotas(){
    this.ms.getMascotasAdmin().subscribe(
     {
       next:(mascotas:solicitudMascota[])=>
       {
       this.listaMascotas = mascotas;
       },
       error:(e:Error)=>{
         console.log(e.message);
       }
     }
   )
 }
 aceptarMascota(mascota:solicitudMascota){
  mascota.resultado= true;
  this.ms.postSolicitudMascotaAceptadaAdmin(mascota).subscribe(
    {
      next:()=>
      {
        alert(`${mascota.nombre} fue aceptad@!`)
        console.log(this.email);
        this.enviarCorreoSA()
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
  )
  this.ms.deleteMascotaByIStandBydAdmin(mascota.id).subscribe(
    {
      next:()=>
        {
         //
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
   
  );
  // window.location.reload()

 }
 rechazarMascota(mascota:solicitudMascota)
 {
  mascota.resultado= false;
  this.ms.postSolicitudMascotaRechazadaAdmin(mascota).subscribe(
    {
      next:()=>
      {
  
        alert(`${mascota.nombre} fue rechazad@...`)
        console.log(this.email);
        this.enviarCorreoSR()
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
  )
  this.ms.deleteMascotaByIStandBydAdmin(mascota.id).subscribe(
    {
      next:()=>
        {
          window.location.reload()
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
  );
 }
 enviarCorreoSA():void 
{


    const email = localStorage.getItem('emailusuario');
    console.log(email);
    const asunto = 'Solicitud Aceptada';
    const mensaje = 'Su mascota ha sido aceptada';
    this.emailservice.enviarCorreo(email!, asunto, mensaje);
}
enviarCorreoSR():void 
{

    const email = localStorage.getItem('emailusuario');
    console.log(email);
    const asunto = 'Solicitud Rechazada';
    const mensaje = 'Su mascota ha sido rechazada';
    this.emailservice.enviarCorreo(email!, asunto, mensaje);
}


}

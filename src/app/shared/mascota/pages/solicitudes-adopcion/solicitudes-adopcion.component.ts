import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ListarMascotasComponent } from '../../components/listar-mascotas/listar-mascotas.component';
import { environment } from '../../../../../environments/environment.development';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { MascotaService } from '../../service/mascota.service';
import Notiflix from 'notiflix';
import { UsuarioServicioService } from '../../../../usuario/service/usuario-servicio.service';
import { cargaUsuario } from '../../Interface/cargaUsuario.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as emailjs from '@emailjs/browser';
import { EmailService } from '../../../../usuario/service/email.service';

@Component({
  selector: 'app-solicitudes-adopcion',
  standalone: true,
  imports: [ListarMascotasComponent,CommonModule],
  templateUrl: './solicitudes-adopcion.component.html',
  styleUrl: './solicitudes-adopcion.component.css'
})
export class SolicitudesAdopcionComponent implements OnInit {
  ngOnInit(): void {
    this.listarMascotas();
    }
  ms = inject(MascotaService)
  us = inject(UsuarioServicioService)
  userId=localStorage.getItem('token');
  user=this.us.getUsuarioByIdUser(this.userId);
  email=localStorage.getItem('emailusuario');
  emailservice=inject(EmailService);
  private usuario: cargaUsuario | null = null;
  http = inject(HttpClient)
  urlBaseEnvio = environment.urlBaseEnvio
  listaMascotas: solicitudMascota[] = []
  listarMascotas(){
    this.ms.getSolicitudesAdopcionAdmin().subscribe(
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
 aceptarAdopcion(mascota:solicitudMascota){
  mascota.resultado= true;
  this.ms.postSolicitudAdopcionAceptadaAdmin(mascota).subscribe(
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
  this.ms.deleteAdopcionByIStandBydAdmin(mascota.id).subscribe(
    {
      next:()=>
        {
          // window.location.reload()
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
  );
 }
 rechazarAdopcion(mascota:solicitudMascota)
 {
  mascota.resultado= false;
  this.ms.postSolicitudAdopcionRechazadaAdmin(mascota).subscribe(
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
  this.ms.deleteAdopcionByIStandBydAdmin(mascota.id).subscribe(
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



//  enviarCorreoSR(id_Usuario:string|null)
//   {
//     Notiflix.Loading.standard('Cargando...');
//     this.us.getUsuarioByIdUser(id_Usuario).subscribe(
//       {
//         next:(userById: cargaUsuario)=>{
//           this.usuario = userById;
//         },
//         error:(e:Error) => { 
//           console.log(e.message);
//         }
//       }
//     );
//     this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Solicitud Rechazada',mensaje:'Su mascota ha sido rechazada'}).subscribe({
//       next:()=>{
//        Notiflix.Loading.remove();
//       },
//       error:(e:Error) => { 
//         console.log(e.message);
//       }
//     })
    
//   }
//   enviarCorreoSA(id_Usuario:string|null)
//   {
//     Notiflix.Loading.standard('Cargando...');
//     this.us.getUsuarioByIdUser(id_Usuario).subscribe(
//       {
//         next:(userById: cargaUsuario)=>{
//           this.usuario = userById;
//         },
//         error:(e:Error) => { 
//           console.log(e.message);
//         }
//       }
//     );
//     this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Solicitud Aceptada',mensaje:'Su mascota ha sido aceptada'}).subscribe({
//       next:()=>{
//        Notiflix.Loading.remove();
//       },
//       error:(e:Error) => { 
//         console.log(e.message);
//       }
//     })
    
//   }

}

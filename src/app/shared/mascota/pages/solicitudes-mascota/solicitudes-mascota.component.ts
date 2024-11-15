import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MascotaService } from '../../service/mascota.service';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import Notiflix from 'notiflix';
import { cargaUsuario } from '../../Interface/cargaUsuario.interface';
import { UsuarioServicioService } from '../../../../usuario/service/usuario-servicio.service';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

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
  this.enviarCorreoMA(mascota.id_Usuario)
  // window.location.reload()

 }
 enviarCorreoMA(id_Usuario:string|null)
  {
    Notiflix.Loading.standard('Cargando...');
    setTimeout(() => {

    }, 2000);
    this.us.getUsuarioByIdUser(id_Usuario).subscribe(
      {
        next:(userById: cargaUsuario)=>{
          this.usuario = userById;
          console.log(this.usuario);
        },
        error:(e:Error) => { 
          console.log(e.message);
        }
      }
    );
     this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Mascota Adoptada',mensaje:'Su mascota ha sido adoptada'}).subscribe({
      next:()=>{
       Notiflix.Loading.remove();
      },
      error:(e:Error) => { 
        console.log(e.message);
      }
    })
    
  }
 rechazarMascota(mascota:solicitudMascota)
 {
  mascota.resultado= false;
  this.ms.postSolicitudMascotaRechazadaAdmin(mascota).subscribe(
    {
      next:()=>
      {
  
        alert(`${mascota.nombre} fue rechazad@...`)
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
  this.enviarCorreoMR(mascota.id_Usuario)
 }
 enviarCorreoMR(id_Usuario:string|null)
 {
   Notiflix.Loading.standard('Cargando...');
   setTimeout(() => {
  }, 2000);
   this.us.getUsuarioByIdUser(id_Usuario).subscribe(
     {
       next:(userById: cargaUsuario)=>{
         this.usuario = userById;
       },
       error:(e:Error) => { 
         console.log(e.message);
       }
     }
   );
   this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Mascota Rechazada',mensaje:'Su mascota ha sido rechazada'}).subscribe({
     next:()=>{
      Notiflix.Loading.remove();
     },
     error:(e:Error) => { 
       console.log(e.message);
     }
   })
   
 }
}

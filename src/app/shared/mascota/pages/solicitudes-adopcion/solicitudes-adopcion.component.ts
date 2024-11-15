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
  this.enviarCorreoSA(mascota.id_Usuario)
 }
 rechazarAdopcion(mascota:solicitudMascota)
 {
  mascota.resultado= false;
  this.ms.postSolicitudAdopcionRechazadaAdmin(mascota).subscribe(
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
  this.enviarCorreoSR(mascota.id_Usuario)
 }
 enviarCorreoSR(id_Usuario:string|null)
  {
    Notiflix.Loading.standard('Cargando...');
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
    this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Solicitud Rechazada',mensaje:'Su mascota ha sido rechazada'}).subscribe({
      next:()=>{
       Notiflix.Loading.remove();
      },
      error:(e:Error) => { 
        console.log(e.message);
      }
    })
    
  }
  enviarCorreoSA(id_Usuario:string|null)
  {
    Notiflix.Loading.standard('Cargando...');
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
    this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Solicitud Aceptada',mensaje:'Su mascota ha sido aceptada'}).subscribe({
      next:()=>{
       Notiflix.Loading.remove();
      },
      error:(e:Error) => { 
        console.log(e.message);
      }
    })
    
  }

}

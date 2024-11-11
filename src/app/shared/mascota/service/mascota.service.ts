
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudMascota } from '../Interface/solicitudMascota.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
import {cargaUsuario} from '../Interface/cargaUsuario.interface';
import Notiflix from 'notiflix';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  us = inject(UsuarioServicioService)
  http = inject(HttpClient)
  private usuario: cargaUsuario | null = null;
  urlBaseEnvio = environment.urlBaseEnvio
   urlBaseAceptadasSM = environment.urlBaseAceptadasSM;
   urlBaseStandBySM = environment.urlBaseStandBySM;
   urlBaseRechazadasSM = environment.urlBaseRechazadasSM;
   urlBaseRechazadasSA = environment.urlBaseRechazadasSA
   urlBaseAceptadasSA = environment.urlBaseAceptadasSA
  getMascotasUser():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseAceptadasSM)
  }
  getMascotasAdmin():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseStandBySM)
  }
  getMascotaByIdUser(id:string|null):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${this.urlBaseAceptadasSM}/${id}`);
  }
  postSolicitudMascotasUser(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseStandBySM}`,mascota)
  }
  postSolicitudMascotaAceptadaAdmin(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseAceptadasSM}`,mascota)
  }
  postSolicitudMascotaRechazadaAdmin(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseRechazadasSM}`,mascota)
  }
  postSolicitudAdopcionAceptadaAdmin(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseAceptadasSA}`,mascota)
  }
  postSolicitudAdopcionRechazadaAdmin(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseRechazadasSA}`,mascota)
  }
 
  deleteMascotaByIStandBydAdmin(id:string):Observable<void>
  {
    return this.http.delete<void>(`${this.urlBaseStandBySM}/${id}`);
  }
  getSolicitudesMascotasAdmin():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseAceptadasSM)
  }
  getSolicitudMascotaByIdAdmin(id:string|null):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${this.urlBaseAceptadasSM}/${id}`);
  }
  enviarCorreoMA(id_Usuario:string)
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
     this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Mascota Adoptada',mensaje:'Su mascota ha sido adoptada'}).subscribe({
      next:()=>{
       Notiflix.Loading.remove();
      },
      error:(e:Error) => { 
        console.log(e.message);
      }
    })
    
  }
  enviarCorreoMR(id_Usuario:string)
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
    this.http.post(this.urlBaseEnvio, {email:this.usuario?.email,asunto:'Mascota Rechazada',mensaje:'Su mascota ha sido rechazada'}).subscribe({
      next:()=>{
       Notiflix.Loading.remove();
      },
      error:(e:Error) => { 
        console.log(e.message);
      }
    })
    
  }
  enviarCorreoSR(id_Usuario:string)
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
  enviarCorreoSA(id_Usuario:string)
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

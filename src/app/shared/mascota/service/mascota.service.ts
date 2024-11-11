
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
 
  urlBaseEnvio = environment.urlBaseEnvio
   urlBaseAceptadasSM = environment.urlBaseAceptadasSM;
   urlBaseStandBySM = environment.urlBaseStandBySM;

   urlBaseRechazadasSM = environment.urlBaseRechazadasSM;
   urlBaseRechazadasSA = environment.urlBaseRechazadasSA
   urlBaseStandBySA = environment.urlBaseStandBySA
   urlBaseAceptadasSA = environment.urlBaseAceptadasSA
  getMascotasUser():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseAceptadasSM)
  }
  getMascotasAdmin():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseStandBySM)
  }
  getSolicitudesAdopcionAdmin():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseStandBySA)
  }
  getMascotaByIdUser(id:string|null):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${this.urlBaseAceptadasSM}/${id}`);
  }
  postSolicitudMascotasUser(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseStandBySM}`,mascota)
  }
  postSolicitudAdopcionUser(mascota:solicitudMascota|null):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseStandBySA}`,mascota)
  }
  postSolicitudMascotaAceptadaAdmin(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseAceptadasSM}`,mascota)
  }
  postSolicitudMascotaRechazadaAdmin(mascota:solicitudMascota):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseRechazadasSM}`,mascota)
  }
  postSolicitudAdopcionAceptadaAdmin(mascota:solicitudMascota):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseAceptadasSA}`,mascota)
  }
  postSolicitudAdopcionRechazadaAdmin(mascota:solicitudMascota):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseRechazadasSA}`,mascota)
  }
 
  deleteMascotaByIStandBydAdmin(id:string):Observable<void>
  {
    return this.http.delete<void>(`${this.urlBaseStandBySM}/${id}`);
  }
  deleteAdopcionByIStandBydAdmin(id:string):Observable<void>
  {
    return this.http.delete<void>(`${this.urlBaseStandBySA}/${id}`);
  }
  getSolicitudesMascotasAdmin():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseAceptadasSM)
  }
  getSolicitudMascotaByIdAdmin(id:string|null):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${this.urlBaseAceptadasSM}/${id}`);
  }
  
 
  getMascotasApi():Observable<string>
  {
    return this.http.get<string>('https://dog.ceo/api/breeds/image/random');
  }

}

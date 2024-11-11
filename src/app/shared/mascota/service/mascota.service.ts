
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudMascota } from '../Interface/solicitudMascota.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  http = inject(HttpClient)
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


}

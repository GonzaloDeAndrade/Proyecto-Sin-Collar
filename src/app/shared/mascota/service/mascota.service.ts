
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
  getMascotasUser():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBaseAceptadasSM)
  }
  getMascotaByIdUser(id:string|null):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${this.urlBaseAceptadasSM}/${id}`);
  }
  postSolicitudMascotasUser(mascota:solicitudMascota,):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBaseStandBySM}`,mascota)
  }
  putMascotasAdmin(mascota:solicitudMascota, id:string|null):Observable<solicitudMascota>
  {
    return this.http.put<solicitudMascota>(`${this.urlBaseAceptadasSM}/${id}`,mascota)
  }
  deleteMascotaByIdAdmin(id:string):Observable<void>
  {
    return this.http.delete<void>(`${this.urlBaseAceptadasSM}/${id}`);
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

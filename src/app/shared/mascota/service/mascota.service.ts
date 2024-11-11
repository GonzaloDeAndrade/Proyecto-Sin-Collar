import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudMascota } from '../Interface/solicitudMascota.interface';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  http = inject(HttpClient)
  urlBaseAceptadasSM = environment.urlBaseAceptadasSA;
  getMascotas(urlBase:string):Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(urlBase)
  }
  
  getMascotaById(id:string|null,urlBase:string):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${urlBase}/${id}`);
  }
  postMascotas(mascota:solicitudMascota,urlBase:string):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${urlBase}`,mascota)
  }

  putMascotas(mascota:solicitudMascota, id:string|null,urlBase:string):Observable<solicitudMascota>
  {
    return this.http.put<solicitudMascota>(`${urlBase}/${id}`,mascota)
  }
  deleteMascotaById(id:string,urlBase:string):Observable<void>
  {
    return this.http.delete<void>(`${urlBase}/${id}`);
  }

}

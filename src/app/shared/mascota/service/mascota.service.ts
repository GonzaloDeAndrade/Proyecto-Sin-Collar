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
  urlBase = environment.urlBaseAceptadasSM


  getMascotas():Observable<solicitudMascota[]>
  {
    return this.http.get<solicitudMascota[]>(this.urlBase)
  }
  getMascotaById(id:string|null):Observable<solicitudMascota>
  {
  return this.http.get<solicitudMascota>(`${this.urlBase}/${id}`);
  }
  postMascotas(mascota:solicitudMascota):Observable<solicitudMascota>
  {
    return this.http.post<solicitudMascota>(`${this.urlBase}`,mascota)
  }

  putMascotas(mascota:solicitudMascota, id:string|null):Observable<solicitudMascota>
  {
    return this.http.put<solicitudMascota>(`${this.urlBase}/${id}`,mascota)
  }
  deleteMascotaById(id:string):Observable<void>
  {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}

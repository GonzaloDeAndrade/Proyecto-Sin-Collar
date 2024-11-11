import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../shared/mascota/Interface/apiResponse.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  http=inject(HttpClient)
   img: ApiResponse|null = null;
  obtenerImagenApi(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://dog.ceo/api/breeds/image/random');
  }
  devolverImagen(){
    this.obtenerImagenApi().subscribe({
      next:(imagenApi:ApiResponse)=>{
        this.setImagen(imagenApi);
      }
    })
  }
  setImagen(img:ApiResponse){
    this.img = img;
  }
}

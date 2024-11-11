import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../shared/mascota/Interface/apiResponse.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  imagen: ApiResponse | null = null;
 
  http = inject(HttpClient);
  

  obtenerImagenApi(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://dog.ceo/api/breeds/image/random');
  }

  devolverImagen() {
    this.obtenerImagenApi().subscribe({
      next: (imagenApi: ApiResponse) => {
        this.imagen = imagenApi;
      },
      error: (e: Error) => {
        console.error(e.message);  
      }
    });
  }

  ngOnInit() {
    this.devolverImagen();

}
}

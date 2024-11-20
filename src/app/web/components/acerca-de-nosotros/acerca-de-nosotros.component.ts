import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavComponent } from '../nav/nav.component';
import { SolicitudesMascotaComponent } from '../../../shared/mascota/pages/solicitudes-mascota/solicitudes-mascota.component';
import { MascotaService } from '../../../shared/mascota/service/mascota.service';
import { ApiResponse } from '../../../shared/mascota/Interface/apiResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-acerca-de-nosotros',
  standalone: true,
  imports: [FooterComponent,NavComponent],
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrl: './acerca-de-nosotros.component.css'
})
export class AcercaDeNosotrosComponent implements OnInit{
      ms = inject(MascotaService)
      imagen :ApiResponse[]=[]
      http = inject(HttpClient);
  ngOnInit(): void {
      this.generarImagen()
  }
  obtenerImagenApi(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://dog.ceo/api/breeds/image/random');
  }
  retornaData():string{
    this.generarImagen()
    return this.dataApi
  }
      generarImagen(){
        
          this.obtenerImagenApi().subscribe({
            next:(img : ApiResponse) =>{
              this.apiResponse = img
              this.dataApi = this.apiResponse.message
            },
            error:(err:Error)=>{

            }
           
          })
        
       
      }
      apiResponse : ApiResponse = {'message':'','status':''}
      dataApi :string=''
      obtenerImagenAleatoria(): string {
        const indiceAleatorio = Math.floor(Math.random() * this.imagen.length);
        this.apiResponse = this.imagen[indiceAleatorio]
      this.dataApi = this.apiResponse.message;
        return  this.dataApi;
      }
}

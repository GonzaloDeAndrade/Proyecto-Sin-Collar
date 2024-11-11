import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MascotaService } from '../../service/mascota.service';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../Interface/apiResponse.interface';
import { NavComponent } from "../../../../web/components/nav/nav.component";
import { FooterComponent } from '../../../../web/components/footer/footer.component';

@Component({
  selector: 'app-add-mascota',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent,FooterComponent],
  templateUrl: './add-mascota.component.html',
  styleUrl: './add-mascota.component.css'
})
export class AddMascotaComponent {

  fb = inject(FormBuilder)
  
  ms = inject(MascotaService)
  http = inject(HttpClient)
  urlBase = environment.urlBaseStandBySM
  formulario = this.fb.nonNullable.group(
    {
      id: ['',[Validators.required] ],
      id_Usuario:[''], 
      nombre:['',[Validators.required, Validators.minLength(3)]],
      raza:['',[Validators.required, Validators.minLength(3)]],
      edad:[0,[Validators.required]],
      sexo:['',[Validators.required]],
      tamanio:[0,[Validators.required]],
      color:['',[Validators.required]],
      imagen:['']
    }
  )
  
  @Output()
  emitirMascota : EventEmitter<solicitudMascota> = new EventEmitter();

  obtenerImagenApi(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://dog.ceo/api/breeds/image/random');
  }
  addMascota() {
    if (this.formulario.invalid) return;
  
    const mascota = this.formulario.getRawValue();
    
    this.obtenerImagenApi().subscribe({
      next: (response: ApiResponse) => {
        mascota.imagen = response.message;
        this.addMascotaDB(mascota);
        this.emitirMascota.emit(mascota);
      },
      error: (e: Error) => {
        console.error(e.message);
      }
    });
  

  }
 

  addMascotaDB(mascota:solicitudMascota)
  {
    this.ms.postSolicitudMascotasUser(mascota).subscribe(
      {
        next: (mascota:solicitudMascota) => {
          console.log(mascota);
          alert('mascota guardada.');
        },
        error:(error:Error)=>{ 
          console.log(error.message);
        }
      }
    )
  }


}

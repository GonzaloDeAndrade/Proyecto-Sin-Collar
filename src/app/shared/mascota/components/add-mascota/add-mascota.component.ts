import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MascotaService } from '../../service/mascota.service';
import { Mascota } from '../../Interface/mascota.interface';

@Component({
  selector: 'app-add-mascota',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-mascota.component.html',
  styleUrl: './add-mascota.component.css'
})
export class AddMascotaComponent {

  fb = inject(FormBuilder)
  ms = inject(MascotaService)



  formulario = this.fb.nonNullable.group(
    {
      id: ['',[Validators.required] ], 
      nombre:['',[Validators.required, Validators.minLength(3)]],
      raza:['',[Validators.required, Validators.minLength(3)]],
      edad:[0,[Validators.required]],
      sexo:['',[Validators.required]],
      tamaño:[0,[Validators.required]],
      color:['',[Validators.required]]

    }
  )

  addMascota()
  {
    if(this.formulario.invalid) return;

    const mascota = this.formulario.getRawValue()

    this.addTareaDB(mascota);
  }

  addTareaDB(tarea:Mascota)
  {
    this.ms.postTareas(tarea).subscribe(
      {
        next: (tarea:Tarea) => {
          console.log(tarea);
          alert('tarea guardada.');
        },
        error:(error:Error)=>{ 
          console.log(error.message); //el msje de error se pued manejar cn librerias mas bonitas
        }
      }
    )
  }
  

}

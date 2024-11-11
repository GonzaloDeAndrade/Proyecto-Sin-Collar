import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { cargaUsuario } from '../shared/mascota/Interface/cargaUsuario.interface';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServicioService } from './service/usuario-servicio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  rol: string | null = null; // Inicialmente sin rol seleccionado


 
    router = inject(Router);
    usuarioService = inject(UsuarioServicioService);
    fb= inject(FormBuilder)
    usuarioForm = this.fb.nonNullable.group(
      {
        rol: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        id: [0, Validators.required]
      }
    )
    agregarUsuario()
    {
      if(this.usuarioForm.invalid) return;
  
      const usuario = this.usuarioForm.getRawValue()
  
      this.agregarUsuarioDB(usuario);
    }
    agregarUsuarioDB(usuario:cargaUsuario) {

      const rolSeleccionado = this.usuarioForm.get('rol')?.value??'';
      this.usuarioService.setRol(rolSeleccionado);
      this.usuarioService.setUsuario(usuario).subscribe
      (
        {
         next : (tarea:cargaUsuario) => {
            console.log('Tarea agregada correctamente', tarea);
            alert ('Tarea guardada');
            if (rolSeleccionado === 'adoptivo') {
              this.router.navigate(['/home']);
            } else if (rolSeleccionado === 'adoptante') {
              this.router.navigate(['/home']);
            }
          },
          error: (e: Error ) =>
          {
  console.log(e.message);
          }
        }
      )
  
}
}

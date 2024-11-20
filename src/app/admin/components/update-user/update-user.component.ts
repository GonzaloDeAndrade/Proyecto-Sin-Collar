import { Component, inject, OnInit } from '@angular/core';
import { cargaUsuario } from '../../../shared/mascota/Interface/cargaUsuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
 
  
    constructor(private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.cargarUsuario(userId);
      }
    }
    
    usuario: cargaUsuario = {
      nombre: '',
      apellido: '',
      contraseña: '',
      telefono: '',
      direccion: '',
      rol: '',
      email: '',
      id:''
    };
    us = inject(UsuarioServicioService)

    cargarUsuario(id: string): void {
      this.us.getUsuarioByIdUser(id).subscribe({
        next:(user:cargaUsuario)=>{
          this.usuario = user;
        }
      })
  
    }
    editarUsuario(id: string|undefined): void {
   
      this.us.getUsuarioByIdUser(id).subscribe({
        next:(user:cargaUsuario)=>{
          this.usuario = user;
        }
      })
      this.us.updateUserAdmin(id,this.usuario).subscribe({
        next:()=>{
          console.log(`${this.usuario?.nombre} fue actualizado!`);
          this.router.navigate(['/admin/users']);
        },
        error:(e:Error)=>{
          console.log("Errorrr");
        }
      })
  }
  
    // Función para volver a la lista de usuarios
    volver(): void {
      this.router.navigate(['/admin/users']);
    }
  }
  


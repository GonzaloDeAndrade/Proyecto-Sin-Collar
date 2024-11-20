import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
import { cargaUsuario } from '../../../shared/mascota/Interface/cargaUsuario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-users.component.html',
  styleUrl: './listar-users.component.css'
})
export class ListarUsersComponent implements OnInit{
    ngOnInit(): void {
      this.cargarLista()
    }
      us = inject(UsuarioServicioService)
      listaUsuarios: cargaUsuario[]|null = null;
      cargarLista(){
        this.us.getUsuario().subscribe({
          next:(users:cargaUsuario[])=>
          {
            this.listaUsuarios = users;
          },
          error:(e:Error) =>
          {
            console.log(e.message);
          }
        })
      }
       userUpdate:cargaUsuario|null = null;
  editarUsuario(id: string|undefined): void {
   
      this.us.getUsuarioByIdUser(id).subscribe({
        next:(user:cargaUsuario)=>{
          this.userUpdate = user;
        }
      })
      this.us.updateUserAdmin(id,this.userUpdate).subscribe({
        next:()=>{
          console.log(`${this.userUpdate?.nombre} fue actualizado!`);
        }
      })
  }

  eliminarUsuario(id: string|undefined): void {
    
  }
}


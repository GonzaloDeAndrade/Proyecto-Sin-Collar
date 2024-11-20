import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
import { cargaUsuario } from '../../../shared/mascota/Interface/cargaUsuario.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    router = inject(Router)
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
        this.router.navigate([`/admin/users/update/${id}`]);
      }
  eliminarUsuario(id: string|undefined): void {
    this.us.deleteUserById(id).subscribe({
      next:()=>{
        console.log("Borrado con exito.");
        this.router.navigate(['/admin/users']);
      }
    })
  }
}


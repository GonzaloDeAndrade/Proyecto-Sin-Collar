import { inject, Injectable } from '@angular/core';
import { cargaUsuario } from '../../shared/mascota/Interface/cargaUsuario.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { EventEmitter } from '@angular/core';

HttpClient
@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {
  private rol: string | null = null;
    http= inject(HttpClient);
    url = 'http://localhost:3000/usuarios';
    private usuario: cargaUsuario | null = null;
    usuarioActualizado = new EventEmitter<void>(); 
    setUsuario(usuario: cargaUsuario): Observable<cargaUsuario> {
      this.usuario = usuario;
      return this.http.post<cargaUsuario>(this.url, usuario);
      this.usuarioActualizado.emit();
    }
    getUsuario(): Observable<cargaUsuario[]> {
      return this.http.get<cargaUsuario[]>(`${this.url}`);
    }
    getUsuarioByIdUser(id:string|null):Observable<cargaUsuario>
  {
  return this.http.get<cargaUsuario>(`${this.url}/${id}`);
  }
     // Obtiene el nombre completo del usuario conectado
     getNombreCompleto(): string {
      return this.usuario ? `${this.usuario.nombre} ${this.usuario.apellido}` : '';
    }
    setRol(rol: string) {
      this.rol = rol;
    }

    getRol(): string | null {
      return this.rol;
    }
  verificarUsuarioExistente(email: string): Observable<boolean> {
    return this.http.get<cargaUsuario[]>(`${this.url}?email=${email}`).pipe(
      map((usuarios: cargaUsuario[])=> usuarios.length > 0) // Devuelve true si hay un usuario con ese email
    );
  }
  cerrarSesion() {
    this.setRol("");
    this.usuarioActualizado.emit();
  
}

}

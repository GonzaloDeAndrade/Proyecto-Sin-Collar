import { Inject, inject, Injectable } from '@angular/core';
import { cargaUsuario } from '../../shared/mascota/Interface/cargaUsuario.interface';
import { HttpClient } from '@angular/common/http';
import { Observable,tap,of,catchError } from 'rxjs';
import { map } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {
  private rol: string | null = null;
    http= inject(HttpClient);
    url = 'http://localhost:3000/usuarios';
    private usuario: cargaUsuario | undefined = undefined;
    usuarioActualizado = new EventEmitter<void>(); 
  
    router= inject(Router);
    get currentUser(): cargaUsuario | undefined {
      if (!this.usuario) return undefined
      //structuredClone(this.user)
      return { ...this.usuario };
    }
  
   
    verificarUserAndPass(email: string, contraseña: string) {
  
      this.getUsuario().subscribe(users => {
        users.find(u => {
          if (u.contraseña === contraseña && u.email === email) {
            this.usuario = u;
            console.log("Exitoso");
            localStorage.setItem('token', u.id!.toString())
            this.router.navigate(['/home'])
          }
        });
      });
    }
  
    checkStatusAutenticacion(): Observable<boolean> {
      const token = localStorage.getItem('token')
      if (!token) {
        return of(false)
      }
      return this.http.get<cargaUsuario>(`${this.url}/${token}`)
        .pipe(
          tap(u => this.usuario = u),
          map(u => !!u),
          catchError(err => of(false))
        )
    }
  
    logout() {
      this.usuario = undefined;
      localStorage.clear()
    }
    setUsuario(usuario: cargaUsuario): Observable<cargaUsuario> {
      this.usuario = usuario;
      return this.http.post<cargaUsuario>(this.url, usuario);
      this.usuarioActualizado.emit();
    }
    getUsuario(): Observable<cargaUsuario[]> {
      return this.http.get<cargaUsuario[]>(`${this.url}`);
    }
    getUserID(): string|undefined
    {
      return this.usuario?.id;
    }

    getUsuarioByIdUser(id:string|undefined|null):Observable<cargaUsuario>
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

}

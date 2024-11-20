import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioServicioService } from '../usuario/service/usuario-servicio.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioServicioService, private router: Router) {}

  canActivate(): boolean {
    // Obtener el usuario logueado desde el servicio
    const email = localStorage.getItem('emailusuario');
  console.log('usuario',email);

    // Validar si el usuario tiene el email "admin"
    if (email === 'admin') {
      return true;
      
       // Permite el acceso
    } else {
      // Redirigir al home si no es admin
        
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Solo los administradores pueden acceder.',
      });
      this.router.navigate(['/login']);
      
      return false; // Bloquea el acceso
    }
  }
}

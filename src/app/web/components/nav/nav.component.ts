import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  usuarioSubscription!: Subscription;
  
  nombreCompleto: string | null = null;
  usuarioService = inject(UsuarioServicioService);
  autenticado$ = this.usuarioService.getAuthStatus();
  estaAutenticado:Observable<boolean> = this.usuarioService.getAuthStatus();

  rol = localStorage.getItem('rol');
  menuOpen = false;
  

  ngOnInit(): void {
    this.actualizarUsuario();
    this.usuarioService.checkStatusAutenticacion().subscribe(
      (autenticado) => {
        console.log("LLEGA"+autenticado);
        console.log("LLEGA"+this.estaAutenticado);
        console.log("LLEGA"+this.rol);
        // autenticado es el valor booleano emitido por el observable
       
      });
      

    
    console.log("lookthis",this.estaAutenticado);
    // Escucha el evento `usuarioActualizado` para actualizar el navbar
    this.usuarioSubscription = this.usuarioService.usuarioActualizado.subscribe(() => {
      this.actualizarUsuario();
    });
  }

  actualizarUsuario() {
    this.rol = this.usuarioService.getRol();
    this.nombreCompleto = this.usuarioService.getNombreCompleto();
  }
  ngOnDestroy() {
    // Cancela la suscripción cuando el componente se destruye para evitar fugas de memoria
    this.usuarioSubscription.unsubscribe();
  }
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
    onCerrarSesion()
    {
      this.usuarioService.logout();
     
    }
    
}

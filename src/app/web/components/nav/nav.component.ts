import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
inject
import { ChangeDetectorRef } from '@angular/core';
import { UsuarioComponent } from '../../../usuario/usuario.component';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  usuarioService = inject(UsuarioServicioService);
  rol: string | null = null;
  router: any;
  
  private cdr!: ChangeDetectorRef;
  

  ngOnInit(): void {
    this.rol = this.usuarioService.getRol();
    
  }
  actualizarRol() {
    this.rol = this.usuarioService.getRol();
    this.cdr.detectChanges(); // Forza la detección de cambios
}
    menuOpen = false;
  
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
    onCerrarSesion()
    {
      this.usuarioService.cerrarSesion();
      this.router.navigate(['/login']);
    }
}

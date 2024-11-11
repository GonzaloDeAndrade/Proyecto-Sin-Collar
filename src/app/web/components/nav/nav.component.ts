import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';
inject
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

  ngOnInit(): void {
    this.rol = this.usuarioService.getRol(); // Obtiene el rol del usuario
  }

    menuOpen = false;
  
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
}

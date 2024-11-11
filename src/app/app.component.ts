import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './web/components/home/home.component';
import { MenuAdminComponent } from './admin/components/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./web/components/footer/footer.component";
import { NavComponent } from './web/components/nav/nav.component';
import { UsuarioServicioService } from './usuario/service/usuario-servicio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    MenuAdminComponent,
    CommonModule, FooterComponent,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuarioService = inject(UsuarioServicioService);
  title = 'sin-collar';
  constructor(private router: Router) {}

  mostrarNavFooter(): boolean {
    console.log(this.usuarioService.getRol());
    
    return this.router.url.includes('/admin') !== true ;
  }
}


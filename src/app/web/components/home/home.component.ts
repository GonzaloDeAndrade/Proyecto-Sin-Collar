import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header/header.component';
import { MainComponent } from '../main/main/main.component';
import { FooterComponent } from '../footer/footer.component';
import { AsideComponent } from '../aside/aside/aside.component';
import { UsuarioServicioService } from '../../../usuario/service/usuario-servicio.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, HeaderComponent, MainComponent, FooterComponent, AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuarioService = inject(UsuarioServicioService);
  rol: string | null = null;

  ngOnInit(): void {
    this.rol = this.usuarioService.getRol(); // Obtiene el rol del usuario
  }
}

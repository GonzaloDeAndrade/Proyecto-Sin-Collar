import { Component } from '@angular/core';
import { UsuarioServicioService } from '../service/usuario-servicio.service';
import { inject } from '@angular/core';
import { MascotaService } from '../../shared/mascota/service/mascota.service';
import { solicitudMascota } from '../../shared/mascota/Interface/solicitudMascota.interface';
import { FooterComponent } from '../../web/components/footer/footer.component';
import { NavComponent } from '../../web/components/nav/nav.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [FooterComponent,NavComponent,CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyProfileComponent {
  userData: any;
  mascotas: solicitudMascota[] = [];
  userService = inject(UsuarioServicioService);
  mascotaService = inject(MascotaService);
  ngOnInit() {
      // Obtener los datos del usuario
      this.obtenerMascotas();
      this.userService.getUsuario().subscribe(data => {
          this.userData = data;
      });
      // Obtener las solicitudes de mascota del usuario
     
  }
  obtenerMascotas() {
    // Llama al servicio para obtener las mascotas del usuario
    this.mascotaService.getMascotasUser().subscribe(
        (mascotas) => {
            this.mascotas = mascotas;
        },
        (error) => {
            console.error("Error al obtener las mascotas:", error);
        }
    );
  }

  
}
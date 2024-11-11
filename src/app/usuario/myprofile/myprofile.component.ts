import { Component } from '@angular/core';
import { UsuarioServicioService } from '../service/usuario-servicio.service';
import { inject } from '@angular/core';
import { MascotaService } from '../../shared/mascota/service/mascota.service';
import { solicitudMascota } from '../../shared/mascota/Interface/solicitudMascota.interface';
@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyProfileComponent {
  userData: any;
  mascotas: solicitudMascota[] = [];
  userService = inject(UsuarioServicioService);
  solicitudService = inject(MascotaService);
  ngOnInit() {
      // Obtener los datos del usuario
      this.userService.getUsuario().subscribe(data => {
          this.userData = data;
      });

      // Obtener las solicitudes de mascota del usuario
     
  }
  
}
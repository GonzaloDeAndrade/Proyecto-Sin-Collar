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
  userId!: string|undefined;
  mascotas: solicitudMascota[] = [];
  userService = inject(UsuarioServicioService);
  mascotaService = inject(MascotaService);
  rol = localStorage.getItem("rol");
  ngOnInit() {
      // Obtener los datos del usuario
     
      this.userId=this.userService.getUserID();
      console.log("USUARIO ID"+this.userId);
      if (this.userId) {
        this.obtenerMascotas();
        this.userService.getUsuarioByIdUser(this.userId).subscribe(data => {
            this.userData = data;
        });
    } else {
        console.warn("userId es undefined o null, no se pueden obtener las mascotas.");
    }
      // Obtener las solicitudes de mascota del usuario
     
  }
  obtenerMascotas() {
    // Llama al servicio para obtener las mascotas del usuario
    if(this.rol =='adoptante')
    {
    if(this.userId)
    {
    console.log("USUARIO ID"+this.userId);
    this.mascotaService.getSolicitudesAdopcionByUser().subscribe({
      next:(mascotas:solicitudMascota[])=>{
        this.mascotas = mascotas.filter(mascota => mascota.id_usuario_adoptante === this.userId);
      },
        error:(error:Error) => {
            console.error("Error al obtener las mascotas:", error);
        }
    });
  }
  else
  {
    console.log("Esta vacio");
  }
}

else
{
  if(this.userId)
    {
    console.log("USUARIO ID"+this.userId);
    this.mascotaService.getMascotasUser().subscribe(
        (mascotas) => {
          this.mascotas = mascotas.filter(mascota => mascota.id_Usuario === this.userId);
        },
        (error) => {
            console.error("Error al obtener las mascotas:", error);
        }
    );
    this.mascotaService.getMascotasAdmin().subscribe({
      next:(mascotasList : solicitudMascota[])=>{
   
       mascotasList = mascotasList.filter(mascota => mascota.id_Usuario === this.userId)
       
       mascotasList.forEach(mascota => {
        this.mascotas.push(mascota);
       });
      },
      error(e:Error)
      {
        console.log("ERROR ANDRU");
      }
    })
  }
  else
  {
    console.log("Esta vacio");
  }

}
}  
}
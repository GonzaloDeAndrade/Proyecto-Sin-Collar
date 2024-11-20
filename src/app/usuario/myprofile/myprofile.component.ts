import { Component } from '@angular/core';
import { UsuarioServicioService } from '../service/usuario-servicio.service';
import { inject } from '@angular/core';
import { MascotaService } from '../../shared/mascota/service/mascota.service';
import { solicitudMascota } from '../../shared/mascota/Interface/solicitudMascota.interface';
import { FooterComponent } from '../../web/components/footer/footer.component';
import { NavComponent } from '../../web/components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [FooterComponent,NavComponent,CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyProfileComponent {
  userData: any;
  userId =localStorage.getItem("token");
  mascotas: solicitudMascota[] = [];
  router= inject(Router);
 
  userService = inject(UsuarioServicioService);
  mascotaService = inject(MascotaService);
  rol = localStorage.getItem("rol");
  user:any= this.userService.getUsuarioByIdUser(this.userId);
  ngOnInit() {
      // Obtener los datos del usuario
     
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirige al login si no hay token
        this.router.navigate(['/login']);
        return;
      }
      
      if (this.userId) {
        this.obtenerMascotas();
        this.userService.getUsuarioByIdUser(this.userId).subscribe(data => {
            this.userData = data;
            
        });
    } else {
      this.obtenerMascotas();
      
        console.warn("userId es undefined o null, no se pueden obtener las mascotas.");
    }
      // Obtener las solicitudes de mascota del usuario
     
  }
  obtenerMascotas() {
    this.mascotas = [];
    // Llama al servicio para obtener las mascotas del usuario
    if(this.rol =='adoptante')
    {
    if(this.userId)
    {
   
    this.mascotaService.getSolicitudAdopcionUser().subscribe({
      next:(mascotas:solicitudMascota[])=>{
       
        this.mascotas = mascotas.filter(mascota => mascota.id_usuario_adoptante === this.userId);
        
        this.mascotaService.getSolicitudesAdopcionByUser().subscribe({
          next:(mascotasList:solicitudMascota[])=>{
            mascotasList = mascotasList.filter(mascota => mascota.id_usuario_adoptante === this.userId);
            mascotasList.forEach(mascota => {
              if(mascota)
              {
              this.mascotas.push(mascota);
              }
             });
            }});
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
        console.log(e);
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
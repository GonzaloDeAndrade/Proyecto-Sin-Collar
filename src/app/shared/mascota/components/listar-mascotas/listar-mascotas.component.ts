
import { Component, inject, OnInit } from '@angular/core';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { MascotaService } from '../../service/mascota.service';
import { AddMascotaComponent } from "../add-mascota/add-mascota.component";
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../../../web/components/nav/nav.component";
import { FooterComponent } from "../../../../web/components/footer/footer.component";
import { RouterLink } from '@angular/router';
import { UsuarioServicioService } from '../../../../usuario/service/usuario-servicio.service';
import { MyProfileComponent } from '../../../../usuario/myprofile/myprofile.component';

@Component({
  selector: 'app-listar-mascotas',
  standalone: true,
  imports: [AddMascotaComponent, CommonModule, NavComponent, FooterComponent,RouterLink],
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent implements OnInit{

  listaMascotas: solicitudMascota[] = [];
  contador: number = 0; 

  ms = inject(MascotaService)
  us = inject(UsuarioServicioService);
  ngOnInit(): void {
    this.obtenerMascotas(); 
  }
  private mascota: solicitudMascota | null = null;
  imagen = '';
  obtenerMascotas(): void {
    this.ms.getMascotasUser().subscribe(
      (mascotas: solicitudMascota[]) => {
        this.listaMascotas = mascotas;
        if (this.listaMascotas.length > 0) {
          this.contador = 0; 
        }
      },
      error => {
        console.error('Error al obtener las mascotas', error);
      }
    );
  }

  siguienteMascota(): void {
    if (this.contador < this.listaMascotas.length - 1) {
      this.contador++;
    }
  }

  anteriorMascota(): void {
    if (this.contador > 0) {
      this.contador--;
    }
  }

  solicitarAdopcion()
  { 

    this.mascota = this.obtenerMascotaActual();
    const id_usuario_adoptante:string|undefined= this.us.getUserID();
    const solicitudAdopcion: solicitudMascota=
    {   id: this.mascota!.id, // Valor predeterminado si falta
      id_Usuario: this.mascota!.id_Usuario || 'default-user',
      id_usuario_adoptante: this.us.getUserID() || 'default-adopter',
      nombre: this.mascota!.nombre || 'Nombre no especificado',
      raza: this.mascota!.raza || 'Raza desconocida',
      edad: this.mascota!.edad || 0, // Valor predeterminado
      sexo: this.mascota!.sexo || 'Desconocido',
      tamanio: this.mascota!.tamanio || 0, // Valor predeterminado
      color: this.mascota!.color || 'Color desconocido',
      resultado: this.mascota!.resultado || false, // Valor predeterminado
      imagen: this.mascota!.imagen || '' 
    } // Obtener el ID del usuario autenticado
    
    this.ms.postSolicitudAdopcionUser(solicitudAdopcion).subscribe({
      next:() =>{
        alert('Solicitud enviada')
        

      },
      error:(e:Error)=>{
        e.message
      }
    })
      
   
  }
  
 
  obtenerMascotaActual(): solicitudMascota | null {
    return this.listaMascotas[this.contador] || null;
  }
}

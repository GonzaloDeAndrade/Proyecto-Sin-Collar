
import { Component, inject, OnInit } from '@angular/core';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { MascotaService } from '../../service/mascota.service';
import { AddMascotaComponent } from "../add-mascota/add-mascota.component";
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../../../web/components/nav/nav.component";
import { FooterComponent } from "../../../../web/components/footer/footer.component";

@Component({
  selector: 'app-listar-mascotas',
  standalone: true,
  imports: [AddMascotaComponent, CommonModule, NavComponent, FooterComponent],
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent implements OnInit{

  listaMascotas: solicitudMascota[] = [];
  contador: number = 0; 

  ms = inject(MascotaService)

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
    this.mascota = this.obtenerMascotaActual()
    this.ms.postSolicitudAdopcionUser(this.mascota).subscribe({
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

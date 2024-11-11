import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ListarMascotasComponent } from '../../components/listar-mascotas/listar-mascotas.component';
import { environment } from '../../../../../environments/environment.development';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { MascotaService } from '../../service/mascota.service';

@Component({
  selector: 'app-solicitudes-adopcion',
  standalone: true,
  imports: [ListarMascotasComponent],
  templateUrl: './solicitudes-adopcion.component.html',
  styleUrl: './solicitudes-adopcion.component.css'
})
export class SolicitudesAdopcionComponent implements OnInit {
  ngOnInit(): void {
    this.listarMascotas();
    }
  ms = inject(MascotaService)
  listaMascotas: solicitudMascota[] = []
  listarMascotas(){
    this.ms.getMascotasAdmin().subscribe(
     {
       next:(mascotas:solicitudMascota[])=>
       {
       this.listaMascotas = mascotas;
       },
       error:(e:Error)=>{
         console.log(e.message);
       }
     }
   )
 }
 aceptarAdopcion(mascota:solicitudMascota){
  mascota.resultado= true;
  this.ms.postSolicitudAdopcionAceptadaAdmin(mascota).subscribe(
    {
      next:()=>
      {
        alert(`${mascota.nombre} fue aceptad@!`)
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
  )
  this.ms.deleteMascotaByIStandBydAdmin(mascota.id).subscribe(
    {
      next:()=>
        {
          window.location.reload()
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
  );
  this.ms.enviarCorreoSA(mascota.id_Usuario)
 }
 rechazarAdopcion(mascota:solicitudMascota)
 {
  mascota.resultado= false;
  this.ms.postSolicitudAdopcionRechazadaAdmin(mascota).subscribe(
    {
      next:()=>
      {
        alert(`${mascota.nombre} fue rechazad@...`)
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
  )
  this.ms.deleteMascotaByIStandBydAdmin(mascota.id).subscribe(
    {
      next:()=>
        {
          window.location.reload()
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
  );
  this.ms.enviarCorreoSR(mascota.id_Usuario)
 }

}

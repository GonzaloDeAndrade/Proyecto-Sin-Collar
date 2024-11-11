import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MascotaService } from '../../service/mascota.service';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';

@Component({
  selector: 'app-solicitudes-mascota',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes-mascota.component.html',
  styleUrl: './solicitudes-mascota.component.css'
})
export class SolicitudesMascotaComponent implements OnInit{
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
 aceptarMascota(mascota:solicitudMascota){
  mascota.resultado= true;
  this.ms.putMascotasAceptadaAdmin(mascota,mascota.id).subscribe(
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
          //no hago nada
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
  );
    
 }
 rechazarMascota(mascota:solicitudMascota)
 {
  mascota.resultado= false;
  this.ms.putMascotasRechazadaAdmin(mascota,mascota.id).subscribe(
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
          //no hago nada
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
    }
  );
 }
}

import { Component, inject, OnInit, Output } from '@angular/core';
import { MascotaService } from '../../service/mascota.service';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';


@Component({
  selector: 'app-listar-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent /*implements OnInit*/{

  

  ms = inject(MascotaService)

  urlBase = "http://localhost:4200/admin/sm";
  
  // /*ngOnInit(): void {
  // this.listarMascotas();
  // }*/
   listaMascotas: solicitudMascota[] = []
  
  // agregarLista(mascota: solicitudMascota)
  // {
  //   this.listaMascotas.push(mascota)
  // }
  // listarMascotas(){
  //    this.ms.getMascotas(this.urlBase).subscribe(
  //     {
  //       next:(mascotas:solicitudMascota[])=>
  //       {
  //       this.listaMascotas = mascotas;
  //       },
  //       error:(e:Error)=>{
  //         console.log(e.message);
  //       }
  //     }
  //   )
  // }
  delete(id:string)
  {
    this.ms.deleteMascotaById(id,this.urlBase).subscribe(
      {
        next:() =>{
          console.log('actualizado');
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
      }
    )
  }
}

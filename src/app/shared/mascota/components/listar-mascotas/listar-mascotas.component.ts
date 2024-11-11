
import { Component, inject, OnInit } from '@angular/core';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { MascotaService } from '../../service/mascota.service';
import { AddMascotaComponent } from "../add-mascota/add-mascota.component";





@Component({
  selector: 'app-listar-mascotas',
  standalone: true,
  imports: [AddMascotaComponent],
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent implements OnInit{


  ms = inject(MascotaService)

  ngOnInit(): void {
  this.listarMascotas();
  }
   listaMascotas: solicitudMascota[] = []
  
  agregarLista(mascota: solicitudMascota)
  {
    this.listaMascotas.push(mascota)
  }
  listarMascotas(){
     this.ms.getMascotasUser().subscribe(
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
  delete(id:string)
  {
    this.ms.deleteMascotaByIdAdmin(id).subscribe(
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

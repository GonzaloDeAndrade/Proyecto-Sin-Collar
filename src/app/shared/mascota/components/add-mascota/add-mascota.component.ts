import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MascotaService } from '../../service/mascota.service';
import { solicitudMascota } from '../../Interface/solicitudMascota.interface';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../Interface/apiResponse.interface';
import { NavComponent } from "../../../../web/components/nav/nav.component";
import { FooterComponent } from '../../../../web/components/footer/footer.component';
import { UsuarioServicioService } from '../../../../usuario/service/usuario-servicio.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-mascota',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent,FooterComponent],
  templateUrl: './add-mascota.component.html',
  styleUrl: './add-mascota.component.css'
})
export class AddMascotaComponent {
   razas: string[] = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "French Bulldog",
    "Bulldog",
    "Poodle",
    "Beagle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Dachshund",
    "Boxer",
    "Siberian Husky",
    "Shih Tzu",
    "Doberman Pinscher",
    "Chihuahua",
    "Australian Shepherd",
    "Pug",
    "Miniature Schnauzer",
    "Cocker Spaniel",
    "Shiba Inu",
    "Pomeranian",
    "Border Collie",
    "Great Dane",
    "Bichon Frise",
    "Saint Bernard",
    "Boston Terrier",
    "Havanese",
    "Maltese",
    "Cavalier King Charles Spaniel",
    "Shetland Sheepdog",
    "Bernese Mountain Dog",
    "Collie",
    "Samoyed",
    "Chow Chow",
    "Pekingese",
    "Newfoundland",
    "Akita",
    "Weimaraner",
    "Pit Bull Terrier",
    "Basset Hound",
    "Bull Terrier",
    "Alaskan Malamute",
    "Bloodhound",
    "King Charles Spaniel",
    "Jack Russell Terrier",
    "Italian Greyhound",
    "Australian Cattle Dog",
    "West Highland White Terrier",
    "Staffordshire Bull Terrier",
    "Lhasa Apso",
    "Toy Poodle",
    "Schnauzer",
    "Tibetan Mastiff",
    "Parson Russell Terrier",
    "Old English Sheepdog",
    "Doberman",
    "Whippet",
    "Mastiff",
    "Rottweiler",
    "Dalmatian",
    "Basenji",
    "Papillon",
    "English Setter",
    "American Bulldog",
    "Cocker Spaniel",
    "Irish Setter",
    "German Shorthaired Pointer",
    "Saluki",
    "English Bulldog",
    "Plott Hound",
    "Yorkie",
    "Mastín Español",
    "Cairn Terrier",
    "Silky Terrier",
    "Australian Terrier",
    "Keeshond",
    "Schipperke",
    "Rhodesian Ridgeback",
    "Maltipoo",
    "Shihpoo",
    "Cairn Terrier",
    "Chinese Crested",
    "Bearded Collie",
    "Belgian Malinois",
    "Cocker Spaniel",
    "Jack Russell",
    "Irish Wolfhound",
    "Finnish Lapphund",
    "Curly-Coated Retriever",
    "Tibetan Terrier",
    "American Cocker Spaniel",
    "Norfolk Terrier",
    "Australian Kelpie",
    "Bolognese",
    "Finnish Spitz",
    "English Cocker Spaniel",
    "American Pit Bull Terrier",
    "Anatolian Shepherd Dog",
    "Russian Toy Terrier",
    "Brussels Griffon",
    "Australian Stumpy Tail Cattle Dog",
    "Schipperke",
    "Xoloitzcuintli",
    "Belgian Tervuren",
    "Manchester Terrier",
    "Kerry Blue Terrier",
    "Miniature Bull Terrier",
    "Bouvier des Flandres",
    "American Eskimo Dog",
    "Belgian Laekenois",
    "Japanese Chin",
    "Lagotto Romagnolo",
    "English Foxhound",
    "Dutch Shepherd",
    "Belgian Sheepdog",
    "American Water Spaniel"
  ];
  imgGenerada:ApiResponse|null=null
  fb = inject(FormBuilder)
  us = inject(UsuarioServicioService);
  ms = inject(MascotaService)
  http = inject(HttpClient)
  urlBase = environment.urlBaseStandBySM

  idMascota = this.generarUuid();
  edades: number[] = Array.from({ length: 21 }, (_, i) => i);
  formulario = this.fb.nonNullable.group(
    {
      id:[this.idMascota],
      id_Usuario:[''], 
      nombre:['',[Validators.required, Validators.minLength(3)]],
      raza:['',[Validators.required, Validators.minLength(3)]],
      edad:[0,[Validators.required]],
      sexo:['',[Validators.required]],
      tamanio:[0,[Validators.required]],
      color:['',[Validators.required]],
      imagen:[''],
      resultado:[false]
    }
  )
  generarUuid(): string {
    return uuidv4();
  }
  
  @Output()
  emitirMascota : EventEmitter<solicitudMascota> = new EventEmitter();
  setImagen(rta: ApiResponse): void {
    this.imgGenerada = rta;
  }


  obtenerImagenApi(): void {
    this.http.get<ApiResponse>('https://dog.ceo/api/breeds/image/random').subscribe({
      next: (response: ApiResponse) => {
        this.setImagen(response);
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }


  addMascota(): void {
    if (this.formulario.invalid) return;

    const mascota = this.formulario.getRawValue();
    const falso = false;
    mascota.resultado = falso;
    const userId= this.us.getUserID();
    if(userId)
    {
      mascota.id_Usuario = userId;
    }
    if (this.imgGenerada) {
      mascota.imagen = this.imgGenerada.message;  
    }

    this.addMascotaDB(mascota);
    this.emitirMascota.emit(mascota);
  }

  // Función para guardar la mascota en la base de datos
  addMascotaDB(mascota: solicitudMascota): void {
    this.ms.postSolicitudMascotasUser(mascota).subscribe({
      next: (mascota: solicitudMascota) => {
        console.log(mascota);
        alert('Mascota guardada.');
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    });
  }
}


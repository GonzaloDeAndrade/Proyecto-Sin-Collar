
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
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listar-mascotas',
  standalone: true,
  imports: [AddMascotaComponent, CommonModule, NavComponent, FooterComponent,RouterLink,FormsModule],
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent implements OnInit{
  listaMascotas: solicitudMascota[] = [];  // Lista de todas las mascotas obtenidas
  listaFiltradaMascotas: solicitudMascota[] = [];  // Lista filtrada de mascotas

  contador: number = 0;  // Contador para navegar entre las mascotas
  edades: number[] = Array.from({ length: 21 }, (_, i) => i); // Edades de 0 a 20
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

  // Filtros
  razaFilter: string = '';
  edadFilter: number | null = null;
  tamanoFilter: number = 0;
  colorFilter: string = '';
  mostrarModal: boolean = false;
  rol=localStorage.getItem('rol');
  mascotaSeleccionada: any = null;

  // Servicios
  ms = inject(MascotaService);
  us = inject(UsuarioServicioService);

  ngOnInit(): void {
    this.obtenerMascotas();  // Cargar las mascotas al iniciar el componente
  }


  // Obtener las mascotas desde el servicio
  obtenerMascotas(): void {
    this.ms.getMascotasUser().subscribe(
      (mascotas: solicitudMascota[]) => {
        this.listaMascotas = mascotas;
        this.filtrarMascotas();  // Aplica los filtros después de obtener las mascotas
      },
      error => {
        console.error('Error al obtener las mascotas', error);
      }
    );
  }

  // Función que se ejecuta cuando cambia el filtro de raza
  onRazaChange(event: any) {
    this.razaFilter = event.target.value || null;
    this.filtrarMascotas();
  }

  // Función que se ejecuta cuando cambia el filtro de edad
  onEdadChange(event: any) {
    this.edadFilter = event.target.value || null;
    this.filtrarMascotas();
  }

  // Función que se ejecuta cuando cambia el filtro de tamaño
  onTamanoChange(event: any) {
    this.tamanoFilter = event.target.value || null;
    this.filtrarMascotas();
  }

  // Función que se ejecuta cuando cambia el filtro de color
  onColorChange(event: any) {
    this.colorFilter = event.target.value || null;
    this.filtrarMascotas();
  }

  // Lógica de filtrado
  filtrarMascotas() {
    // Filtra las mascotas de acuerdo con los filtros seleccionados
    this.listaFiltradaMascotas = this.listaMascotas.filter(mascota => {
      const coincideRaza = this.razaFilter ? mascota.raza.toLowerCase().includes(this.razaFilter.toLowerCase()) : true;
      const coincideEdad = this.edadFilter !== null ? mascota.edad === this.edadFilter : true;
      const coincideTamano = this.tamanoFilter ? mascota.tamanio === this.tamanoFilter : true;
      const coincideColor = this.colorFilter ? mascota.color === this.colorFilter : true;

      return coincideRaza && coincideEdad && coincideTamano && coincideColor;
    });
  }

  // Métodos para navegar entre las mascotas
  // siguienteMascota(): void {
  //   if (this.contador < this.listaFiltradaMascotas.length - 1) {
  //     this.contador++;
  //   }
  // }

  // anteriorMascota(): void {
  //   if (this.contador > 0) {
  //     this.contador--;
  //   }
  // }

  // Método para obtener la mascota actual según el contador
  obtenerMascotaActual(): solicitudMascota | null {
    return this.listaFiltradaMascotas[this.contador] || null;
  }

  // Método para solicitar adopción
  solicitarAdopcion(idMascota: string) {
     const mascotaActual = this.listaFiltradaMascotas.find((mascota) => mascota.id === idMascota);
     console.log(mascotaActual);

  if (!mascotaActual) {
    alert('No se encontró la mascota seleccionada.');
    return;
  }


    const id_usuario_adoptante: string | undefined = this.us.getUserID();
    const solicitudAdopcion: solicitudMascota = {
      id: mascotaActual.id,
      id_Usuario: mascotaActual.id_Usuario || 'default-user',
      id_usuario_adoptante: id_usuario_adoptante || 'default-adopter',
      nombre: mascotaActual.nombre || 'Nombre no especificado',
      raza: mascotaActual.raza || 'Raza desconocida',
      edad: mascotaActual.edad || 0,
      sexo: mascotaActual.sexo || 'Desconocido',
      tamanio: mascotaActual.tamanio || 0,
      color: mascotaActual.color || 'Color desconocido',
      resultado:false,
      imagen: mascotaActual.imagen || '',
    };
   

    this.ms.postSolicitudAdopcionUser(solicitudAdopcion).subscribe({
      next: () => {
        alert('Solicitud enviada');
      },
      error: (e: Error) => {
        console.error(e.message);
      }
    });
  }
  
    abrirModal(mascota: solicitudMascota): void {
      this.mostrarModal = true;
      this.mascotaSeleccionada = mascota;
    }
  
    cerrarModal(): void {
      this.mostrarModal = false;
      this.mascotaSeleccionada = null;
    }
  }
  



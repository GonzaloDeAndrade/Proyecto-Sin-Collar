import { Component, OnInit } from '@angular/core';
import { UsuarioServicioService } from '../service/usuario-servicio.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyProfileComponent implements OnInit{
  userData: any;
userService = inject(UsuarioServicioService);

  ngOnInit() {
      this.userService.getUsuario().subscribe(data => {
          this.userData = data;
      });
  }
}
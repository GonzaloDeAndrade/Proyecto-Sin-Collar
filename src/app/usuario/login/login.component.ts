import { Component } from '@angular/core';
import { NavComponent } from '../../web/components/nav/nav.component';
import { FormBuilder,FormGroup,Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioServicioService } from '../service/usuario-servicio.service';
import { FooterComponent } from "../../web/components/footer/footer.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder)
  private auth: UsuarioServicioService = inject(UsuarioServicioService)
  private router: Router = inject(Router)
  mostrarContrasena = false;

  formulario: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    contraseña: ['', Validators.required],
  })

  iniciarSession() {
    if (this.formulario.invalid) return;

    this.auth.verificarUserAndPass(
      this.formulario.controls['email'].value,
      this.formulario.controls['contraseña'].value)


    /* const user: User = {
      user: this.formulario.controls['user'].value,
      password: this.formulario.controls['password'].value,
      id?:null
    }

    this.auth.loginUser(user.user, user.password) */
  }
  togglePasswordVisibility() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}


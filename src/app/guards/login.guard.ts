import { inject } from '@angular/core';
import { UsuarioServicioService } from '../usuario/service/usuario-servicio.service';
import { Router} from '@angular/router';
import { Observable, map, tap } from 'rxjs';

function checkAuthStatus(): boolean | Observable<boolean>{
  const authService = inject(UsuarioServicioService);
  const  router = inject(Router);
  return authService.checkStatusAutenticacion()
                    .pipe(
                      tap( estaAutenticado => {
                        if(estaAutenticado){
                          router.navigate(['/home'])

                        }
                      }),
                      map(estaAutenticado => !estaAutenticado)
                    )
}

export const LoginGuard = () => {
  return checkAuthStatus()
}
# SinCollar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Instalaciones necesarias  
npm i notiflix  
npm i uuid  
npm i @emailjs/browser  
npm i sweetalert2  

Levantamiento de servidor  
ng s -o  
json-server db/db.json --watch  
Una vez hecho esto podemos utilizar la pagina para las pruebas necesarias.  
La idea del proyecto es que un usuario pueda registrarse como adoptivo o adoptante.  
Las solicitudes de adopcion y de mascota las va a manejar el admin.  
Para ingresar al menu del admin van a tener que crear un usuario que tenga como mail "Admin" solamente, sin arrobas ni nada.  
Una vez ingresado sesion con dicho admin les figurara un boton para llevarlos al menu y realizar el ABM de usuarios y aceptas o rechazar solicitudes.  
Por otro lado los usuarios van a tener que enviar informacion de las mascotas, el admin las tendria que aceptar y asi una vez aceptadas el usuario adoptante las veria en el perfil para poder adoptar y luego el admin nuevamente tendria que aceptar la solicitud.  
Cuando se aceptan o rechazan solicitudes, las mismas se notifican por mail.  
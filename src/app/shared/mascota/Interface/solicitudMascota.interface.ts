export interface solicitudMascota{
    id:string,
    id_Usuario:string,
    id_usuario_adoptante?:string,
    nombre: string,
    raza:string,
    edad:number,
    sexo:string,
    tamanio: number,
    color:string,
    resultado?:boolean,
    imagen:string
}
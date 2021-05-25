export class Usuario {
    constructor(
        public cedula: string,
        public nombre: string,
        public primer_apellido: string,
        public segundo_apellido: string,
        public contrasenna: string,
        public correo_electronico: string,
        public rol: string,
        public numero_telefono: string,
        public url_foto_usuario: string
    ) { }

}
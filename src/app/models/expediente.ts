export class Expediente {
    constructor(
        public cedula: string,
        public nombre: string,
        public primer_apellido: string,
        public segundo_apellido: string,
        public correo_electronico: string,
        public nacionalidad: string,
        public fecha_nacimiento: string,
        public domicilio_provincia: string,
        public domicilio_canton: string,
        public domicilio_distrito: string,
        public identidad_etnica: string,
        public numero_telefono: number,
    ) { }

}

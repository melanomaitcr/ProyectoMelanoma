export class Cita {
    constructor(
        public id_cita: string,
        public cedula_medico: string,
        public cedula_paciente: string,
        public fecha_hora_cita: string,
        public clave: string,
        public datos_ingresados_paciente: string,
        public cita_finalizada: string,
        public descripcion: string,
        public anotaciones: string
    ) { }

}
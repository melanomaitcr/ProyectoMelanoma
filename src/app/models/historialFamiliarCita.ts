export class HistorialFamiliarCita {
    constructor(
        public id_cita: string,
        public rellenado_por_paciente: string,
        public familiares_con_cancer_melanoma: string,
        public parientes_con_cancer_melanoma: string,
        public familiares_con_otro_tipo_cancer: string,
    ) { }
}
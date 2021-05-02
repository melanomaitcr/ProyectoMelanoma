export class HistorialPersonalCita {
    constructor(
        public id_cita: string,
        public rellenado_por_paciente: string,
        public peso_kg: number,
        public estatura_cm: number,
        public imc: number,
        public realizacion_actividad_fisica: string,
        public minutos_semana_actividad_fisica: number,
        public diagnostico_propio_cancer: string,
        public tipos_cancer_propios: string,
        public fuma_o_ha_fumado: string,
        public edad_empezo_fumar: number,
        public fuma_actualmente: string,
        public periodo_fumado: string,
        public consume_bebidas_alcoholicas: string,
        public consume_bebidas_alcoholicas_total: number,
        public consume_bebidas_alcoholicas_total_otro: string
    ) { }
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoCitaComponent } from './vistas-inicio/ingreso-cita/ingreso-cita.component';
import { InicioSesionComponent } from './vistas-inicio/inicio-sesion/inicio-sesion.component';
import { CitaRegistroComponent } from './vistas-administrador/cita-registro/cita-registro.component';
import { UsuarioRegistroComponent } from './vistas-administrador/usuario-registro/usuario-registro.component';
import { UsuarioEdicionComponent } from './vistas-administrador/usuario-edicion/usuario-edicion.component';
import { UsuariosComponent } from './vistas-administrador/usuarios/usuarios.component';
import { CitaComponent } from './vistas-administrador/cita/cita.component';
import { CitasComponent } from './vistas-administrador/citas/citas.component';
import { ExpedientesComponent } from './vistas-administrador/expedientes/expedientes.component';
import { InicioSesionGuard } from './guards/inicio-sesion.guard';
import { AdministradorGuard } from './guards/administrador.guard';
import { AsistenteGuard } from './guards/asistente.guard';
import { MedicoGuard } from './guards/medico.guard';
import { PacienteGuard } from './guards/paciente.guard';
import { SesionAbiertaGuard } from './guards/sesion-abierta.guard';
import { ExpedienteComponent } from './vistas-administrador/expediente/expediente.component';

import { FormularioCitaComponent } from './vistas-paciente/formulario-cita/formulario-cita.component';
import { CitasAsistenteComponent } from './vistas-asistente/citas-asistente/citas-asistente.component';
import { ExpedientesAsistenteComponent } from './vistas-asistente/expedientes-asistente/expedientes-asistente.component';
import { ExpedientesMedicoComponent } from './vistas-medico/expedientes-medico/expedientes-medico.component';
import { ExpedienteMedicoComponent } from './vistas-medico/expediente-medico/expediente-medico.component';
import { CitasMedicoComponent } from './vistas-medico/citas-medico/citas-medico.component';
import { CitaMedicoComponent } from './vistas-medico/cita-medico/cita-medico.component';
import { parseHostBindings } from '@angular/compiler';

import { InformacionPerfilComponent } from './vistas-administrador/informacion-perfil/informacion-perfil.component';
import { AcercaDeComponent } from './vistas-inicio/acerca-de/acerca-de.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'usuario', component: UsuarioEdicionComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'usuario-registro', component: UsuarioRegistroComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },

  { path: 'ingreso-cita', component: IngresoCitaComponent, canActivate: [SesionAbiertaGuard] },
  { path: 'inicio-sesion', component: InicioSesionComponent, canActivate: [SesionAbiertaGuard] },

  { path: 'citas', component: CitasComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'cita', component: CitaComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },

  { path: 'expedientes', component: ExpedientesComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'expediente', component: ExpedienteComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },

  { path: 'formulario-cita', component: FormularioCitaComponent, canActivate: [InicioSesionGuard, PacienteGuard] },

  { path: 'citas-asistente', component: CitasAsistenteComponent, canActivate: [InicioSesionGuard, AsistenteGuard] },
  { path: 'expedientes-asistente', component: ExpedientesAsistenteComponent, canActivate: [InicioSesionGuard, AsistenteGuard] },

  { path: 'citas-medico', component: CitasMedicoComponent, canActivate: [InicioSesionGuard, MedicoGuard] },
  { path: 'cita-medico', component: CitaMedicoComponent, canActivate: [InicioSesionGuard, MedicoGuard] },

  { path: 'expedientes-medico', component: ExpedientesMedicoComponent, canActivate: [InicioSesionGuard, MedicoGuard] },
  { path: 'expediente-medico', component: ExpedienteMedicoComponent, canActivate: [InicioSesionGuard, MedicoGuard] },

  { path: 'informacion-perfil', component: InformacionPerfilComponent },
  { path: 'acerca-de', component: AcercaDeComponent},
];



// { path: 'cita', component: CitaComponent }, MEDi y ADmin
// { path: 'formulario-cjta', component: CitaComponent },

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/**

let x = {
  "anotaciones": "El paciente se encuentra muy bien y est\u00e1 sano.",
  "cedula_medico": "705420109",
  "cedula_paciente": "301420857",
  "cita_finalizada": "1",
  "clave": "2bf3260c7e",
  "datos_ingresados_paciente": "0",
  "descripcion": "Cita de revisi\u00f3n peri\u00f3dica",
  "fecha_hora_cita": "Mon, 03 May 2021 10:00:00 GMT",
  "id_cita": "2",
  "historiales_personales":
    [{
      "consume_bebidas_alcoholicas": "2",
      "consume_bebidas_alcoholicas_total": 2,
      "consume_bebidas_alcoholicas_total_otro": null,
      "diagnostico_propio_cancer": "1",
      "edad_empezo_fumar": 15,
      "estatura_cm": 175.0,
      "fuma_actualmente": "1",
      "fuma_o_ha_fumado": "1",
      "id_cita": "2",
      "imc": 26.122,
      "minutos_semana_actividad_fisica": 60,
      "periodo_fumado": "3",
      "peso_kg": 80.0,
      "realizacion_actividad_fisica": "1",
      "rellenado_por_paciente": "1",
      "tipos_cancer_propios": "Est\u00f3mago"
    },
    {
      "consume_bebidas_alcoholicas": "2",
      "consume_bebidas_alcoholicas_total": 2,
      "consume_bebidas_alcoholicas_total_otro": null,
      "diagnostico_propio_cancer": "1",
      "edad_empezo_fumar": 15,
      "estatura_cm": 175.0,
      "fuma_actualmente": "1",
      "fuma_o_ha_fumado": "1",
      "id_cita": "2",
      "imc": 26.122,
      "minutos_semana_actividad_fisica": 60,
      "periodo_fumado": "3",
      "peso_kg": 80.0,
      "realizacion_actividad_fisica": "1",
      "rellenado_por_paciente": "0",
      "tipos_cancer_propios": "Est\u00f3mago"
    }],

  "archivos_cita": [
    {
      "id_archivo": "2",
      "id_cita": "2",
      "imagen_prediagnostico": null,
      "nombre_archivo": "Archivo PDF.pdf",
      "tipo_archivo": "A",
      "url_archivo": "BASE_64"
    }, {
      "id_archivo": "5",
      "id_cita": "2",
      "imagen_prediagnostico": null,
      "nombre_archivo": "Archivo PDF.pdf",
      "tipo_archivo": "A",
      "url_archivo": "BASE_64"
    }
  ]

}

*/
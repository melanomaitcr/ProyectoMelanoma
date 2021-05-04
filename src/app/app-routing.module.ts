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
import { AsistenteAdministradorGuard } from './guards/asistente-administrador.guard';
import { SesionAbiertaGuard } from './guards/sesion-abierta.guard';
import { ExpedienteComponent } from './vistas-administrador/expediente/expediente.component';

import { FormularioCitaComponent } from './vistas-paciente/formulario-cita/formulario-cita.component';
import { CitasAsistenteComponent } from './vistas-asistente/citas-asistente/citas-asistente.component';
import { ExpedientesAsistenteComponent } from './vistas-asistente/expedientes-asistente/expedientes-asistente.component';
import { ExpedientesMedicoComponent } from './vistas-medico/expedientes-medico/expedientes-medico.component';
import { ExpedienteMedicoComponent } from './vistas-medico/expediente-medico/expediente-medico.component';
import { CitasMedicoComponent } from './vistas-medico/citas-medico/citas-medico.component';
import { CitaMedicoComponent } from './vistas-medico/cita-medico/cita-medico.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'usuario', component: UsuarioEdicionComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'usuario-registro', component: UsuarioRegistroComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },

  { path: 'ingreso-cita', component: IngresoCitaComponent, canActivate: [SesionAbiertaGuard] },
  { path: 'inicio-sesion', component: InicioSesionComponent, canActivate: [SesionAbiertaGuard] },

  { path: 'citas', component: CitasComponent, canActivate: [InicioSesionGuard] },
  { path: 'cita', component: CitaComponent, canActivate: [InicioSesionGuard] },
  { path: 'cita-registro', component: CitaRegistroComponent, canActivate: [InicioSesionGuard, AsistenteAdministradorGuard] },

  { path: 'expedientes', component: ExpedientesComponent, canActivate: [InicioSesionGuard] },
  { path: 'expediente', component: ExpedienteComponent },

  { path: 'formulario-cita', component: FormularioCitaComponent },

  { path: 'citas-asistente', component: CitasAsistenteComponent, canActivate: [InicioSesionGuard] },
  { path: 'expedientes-asistente', component: ExpedientesAsistenteComponent, canActivate: [InicioSesionGuard] },

  { path: 'citas-medico', component: CitasMedicoComponent, canActivate: [InicioSesionGuard] },
  { path: 'cita-medico', component: CitaMedicoComponent, canActivate: [InicioSesionGuard] },

  { path: 'expedientes-medico', component: ExpedientesMedicoComponent, canActivate: [InicioSesionGuard] },
  { path: 'expediente-medico', component: ExpedienteMedicoComponent, canActivate: [InicioSesionGuard] },
];



// { path: 'cita', component: CitaComponent }, MEDi y ADmin
// { path: 'formulario-cjta', component: CitaComponent },

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


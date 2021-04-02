import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoCitaComponent } from './vistas-inicio/ingreso-cita/ingreso-cita.component';
import { InicioSesionComponent } from './vistas-inicio/inicio-sesion/inicio-sesion.component';
import { CitaRegistroComponent } from './vistas-asistente/cita-registro/cita-registro.component';
import { UsuarioRegistroComponent } from './vistas-administrador/usuario-registro/usuario-registro.component';
import { UsuarioComponent } from './vistas-administrador/usuario/usuario.component';
import { UsuariosComponent } from './vistas-administrador/usuarios/usuarios.component';
import { CitaComponent } from './vistas-paciente/cita/cita.component';
import { CitasComponent } from './vistas-administrador/citas/citas.component';
import { ExpedientesComponent } from './vistas-administrador/expedientes/expedientes.component';
import { InicioSesionGuard } from './guards/inicio-sesion.guard';
import { AdministradorGuard } from './guards/administrador.guard';
import { AsistenteAdministradorGuard } from './guards/asistente-administrador.guard';
import { AppComponent } from './app.component';
import { SesionAbiertaGuard } from './guards/sesion-abierta.guard';

const routes: Routes = [
  { path: 'perrito', component: AppComponent },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },
  { path: 'usuario-registro', component: UsuarioRegistroComponent, canActivate: [InicioSesionGuard, AdministradorGuard] },

  { path: 'ingreso-cita', component: IngresoCitaComponent, canActivate: [SesionAbiertaGuard] },
  { path: 'inicio-sesion', component: InicioSesionComponent, canActivate: [SesionAbiertaGuard] },

  { path: 'citas', component: CitasComponent, canActivate: [InicioSesionGuard] },
  { path: 'cita', component: CitaComponent, canActivate: [InicioSesionGuard] },
  { path: 'cita-registro', component: CitaRegistroComponent, canActivate: [InicioSesionGuard, AsistenteAdministradorGuard] },

  { path: 'expedientes', component: ExpedientesComponent, canActivate: [InicioSesionGuard] },
];


// { path: 'cita', component: CitaComponent }, MEDi y ADmin
// { path: 'formulario-cjta', component: CitaComponent },

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


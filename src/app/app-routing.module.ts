import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent, canActivate: [InicioSesionGuard] },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'ingreso-cita', component: IngresoCitaComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'cita-registro', component: CitaRegistroComponent },
  { path: 'usuario-registro', component: UsuarioRegistroComponent },
  { path: 'cita', component: CitaComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'expedientes', component: ExpedientesComponent },
];


// { path: 'cita', component: CitaComponent }, MEDi y ADmin
// { path: 'formulario-cjta', component: CitaComponent },

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


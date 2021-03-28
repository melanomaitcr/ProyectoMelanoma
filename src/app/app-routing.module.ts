import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoCitaComponent } from './vistas-inicio/ingreso-cita/ingreso-cita.component';
import { InicioSesionComponent } from './vistas-inicio/inicio-sesion/inicio-sesion.component';
import { CitaRegistroComponent } from './vistas-asistente/cita-registro/cita-registro.component';
import { UsuarioRegistroComponent } from './vistas-administrador/usuario-registro/usuario-registro.component';
import { UsuarioComponent } from './vistas-administrador/usuario/usuario.component';
import { UsuariosComponent } from './vistas-administrador/usuarios/usuarios.component';


const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'ingreso-cita', component: IngresoCitaComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'registro-cita', component: CitaRegistroComponent },
  { path: 'registro-usuario', component: UsuarioRegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoCitaComponent } from './ingreso-cita/ingreso-cita.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroCitaComponent } from './registro-cita/registro-cita.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'ingreso-cita', component: IngresoCitaComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'registro-cita', component: RegistroCitaComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IngresoCitaComponent, IngresoCitaComponentOkDialog } from './vistas-inicio/ingreso-cita/ingreso-cita.component';
import { InicioSesionComponent, InicioSesionComponentOkDialog } from './vistas-inicio/inicio-sesion/inicio-sesion.component';
import { CitaRegistroComponent } from './vistas-administrador/cita-registro/cita-registro.component';
import { UsuarioRegistroComponent } from './vistas-administrador/usuario-registro/usuario-registro.component';
import { UsuarioEdicionComponent } from './vistas-administrador/usuario-edicion/usuario-edicion.component';
import { UsuariosComponent } from './vistas-administrador/usuarios/usuarios.component';
import { FormularioCitaComponent} from './vistas-paciente/formulario-cita/formulario-cita.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarInicioComponent } from './navbars/navbar-inicio/navbar-inicio.component';
import { NavbarMedicoComponent } from './navbars/navbar-medico/navbar-medico.component';
import { NavbarAsistenteComponent } from './navbars/navbar-asistente/navbar-asistente.component';
import { NavbarAdministradorComponent } from './navbars/navbar-administrador/navbar-administrador.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CitaComponent } from './vistas-paciente/cita/cita.component';
import { CitasComponent } from './vistas-administrador/citas/citas.component';
import { ExpedientesComponent } from './vistas-administrador/expedientes/expedientes.component';
import { InterceptorService } from './services/interceptor.service';
import { InicioSesionGuard } from './guards/inicio-sesion.guard';
import { NavbarPacienteComponent } from './navbars/navbar-paciente/navbar-paciente.component';
import { DatePipe } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { UsuarioBorradoComponent } from './vistas-administrador/usuario-borrado/usuario-borrado.component';
import { UsuarioRegistroConfirmacionComponent } from './vistas-administrador/usuario-registro-confirmacion/usuario-registro-confirmacion.component';
import { ExpedienteEdicionComponent } from './vistas-administrador/expediente-edicion/expediente-edicion.component';
import { ExpedienteBorradoComponent } from './vistas-administrador/expediente-borrado/expediente-borrado.component';
import { ExpedienteRegistroComponent } from './vistas-administrador/expediente-registro/expediente-registro.component';
import { ExpedienteRegistroConfirmacionComponent } from './vistas-administrador/expediente-registro-confirmacion/expediente-registro-confirmacion.component';
import { CitaBorradoComponent } from './vistas-administrador/cita-borrado/cita-borrado.component';
import { ExpedienteComponent } from './vistas-administrador/expediente/expediente.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { CitaEdicionComponent } from './vistas-administrador/cita-edicion/cita-edicion.component';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuarioEdicionComponent,
    UsuarioRegistroComponent,
    CitaRegistroComponent,
    InicioSesionComponent,
    IngresoCitaComponent,
    InicioSesionComponentOkDialog,
    NavbarInicioComponent,
    NavbarMedicoComponent,
    NavbarAsistenteComponent,
    NavbarAdministradorComponent,
    IngresoCitaComponentOkDialog,
    CitaComponent,
    CitasComponent,
    ExpedientesComponent,
    NavbarPacienteComponent,
    UsuarioBorradoComponent,
    UsuarioRegistroConfirmacionComponent,
    ExpedienteEdicionComponent,
    ExpedienteBorradoComponent,
    ExpedienteRegistroComponent,
    ExpedienteRegistroConfirmacionComponent,
    CitaBorradoComponent,
    CitaEdicionComponent,
    FormularioCitaComponent,
    ExpedienteComponent,
  ],
  imports: [
    FlexLayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MaterialFileInputModule
  ],
  exports: [CitasComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, DatePipe,
  { provide: LOCALE_ID, useValue: 'es-ES' },
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }, InicioSesionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

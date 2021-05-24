import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navbar-asistente',
  templateUrl: './navbar-asistente.component.html',
  styleUrls: ['./navbar-asistente.component.scss']
})
export class NavbarAsistenteComponent implements OnInit {

  @Input()
  paginaActual: string;

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.autenticacionService.cerrarSesion();
  }

  getPaginaActual() {
    return this.paginaActual;
  }


  vistaCitas() {
    this.paginaActual = 'citas';
    this.router.navigate(['/citas-asistente']);
  }

  vistaExpedientes() {
    this.paginaActual = 'expedientes';
    this.router.navigate(['/expedientes-asistente']);
  }

  vistaPerfil() {
    this.paginaActual = 'perfil';
    this.router.navigate(['/informacion-perfil-asistente']);
  }

}

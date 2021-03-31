import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.scss']
})
export class NavbarAdministradorComponent implements OnInit {

  @Input()
  paginaActual: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  f() {

  }

  getPaginaActual() {
    return this.paginaActual;
  }

  vistaUsuarios() {
    this.paginaActual = 'usuarios';
    this.router.navigate(['/usuarios']);
  }

  vistaCitas() {
    this.paginaActual = 'citas';
    this.router.navigate(['/citas']);
  }

  vistaExpedientes() {
    this.paginaActual = 'expedientes';
    this.router.navigate(['/expedientes']);
  }

}

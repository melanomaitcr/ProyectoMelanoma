import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate() {
    if (this.autenticacionService.auth_token)
      return true;
    console.log(this.autenticacionService);

    this.router.navigate(['/inicio-sesion']);
    return false;
  }

}



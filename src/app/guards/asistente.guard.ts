import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenteGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate() {
    if (this.autenticacionService.rol == 'A')
      return true;
    else if (this.autenticacionService.rol == 'D')
      this.router.navigate(['/usuarios']);
    else if (this.autenticacionService.rol == 'M')
      this.router.navigate(['/citas-medico']);
    else if (this.autenticacionService.rol == 'P')
      this.autenticacionService.cerrarSesion()

    return false;
  }

}

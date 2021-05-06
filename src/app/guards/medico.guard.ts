import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate() {
    if (this.autenticacionService.rol == 'M')
      return true;
    else if (this.autenticacionService.rol == 'D')
      this.router.navigate(['/usuarios']);
    else if (this.autenticacionService.rol == 'M')
      this.router.navigate(['/citas-medico']);
    else if (this.autenticacionService.rol == 'P')
      this.autenticacionService.cerrarSesion()

  }

}

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AutenticacionService } from './autenticacion.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private autenticacionService: AutenticacionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('inicio-sesion') || (req.url.includes('ingreso-cita')))
      return next.handle(req);

    req = req.clone({ headers: req.headers.set('auth-token', this.autenticacionService.auth_token) });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error["text"] == "INVALID_TOKEN")
          this.autenticacionService.cerrarSesion()
        let errorMsg = '';

        return throwError(errorMsg);

      }));
  }
}

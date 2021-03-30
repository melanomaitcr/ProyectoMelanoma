import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';

const baseUrl = 'http://localhost:4200/api/expediente';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor(private https: HttpClient, private autenticacionService: AutenticacionService) { }

  findAll() {
    return this.https.get(baseUrl, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  findByPk(cedula) {
    return this.https.get(`${baseUrl}/${cedula}`, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  create(data) {
    return this.https.post(baseUrl, data, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  update(cedula, data) {
    return this.https.put(`${baseUrl}/${cedula}`, data, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  delete(cedula) {
    return this.https.delete(`${baseUrl}/${cedula}`, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

}

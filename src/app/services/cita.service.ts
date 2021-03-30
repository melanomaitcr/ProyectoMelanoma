import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';

const baseUrl = 'http://localhost:4200/api/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private https: HttpClient, private autenticacionService: AutenticacionService) { }

  findAll() {
    return this.https.get(baseUrl, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  findByPk(id_cita) {
    return this.https.get(`${baseUrl}/${id_cita}`, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  findByUser(cedula) {
    return this.https.get(`${baseUrl}/paciente/${cedula}`, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  create(data) {
    return this.https.post(baseUrl, data, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  update(id_cita, data) {
    return this.https.put(`${baseUrl}/${id_cita}`, data, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

  delete(id_cita) {
    return this.https.delete(`${baseUrl}/${id_cita}`, { headers: { 'auth-token': this.autenticacionService.auth_token } });
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//const baseUrl = 'http://melanomaitcr.pythonanywhere.com/api/cita';
const baseUrl = window.location.origin + '/api/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private https: HttpClient) { }

  findAll() {
    return this.https.get(baseUrl);
  }

  findAllMedico() {
    return this.https.get(baseUrl + 'All');
  }

  findByPk(id_cita) {
    return this.https.get(`${baseUrl}/${id_cita}`);
  }

  findByUser(cedula) {
    return this.https.get(`${baseUrl}/paciente/${cedula}`);
  }

  create(data) {
    return this.https.post(baseUrl, data);
  }

  update(id_cita, data) {
    return this.https.put(`${baseUrl}/${id_cita}`, data);
  }

  delete(id_cita) {
    return this.https.delete(`${baseUrl}/${id_cita}`);
  }

}


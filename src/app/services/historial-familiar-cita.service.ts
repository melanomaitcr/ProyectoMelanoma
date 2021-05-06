import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//const baseUrl = 'http://melanomaitcr.pythonanywhere.com/api/historialFamiliarCita';
const baseUrl = window.location.origin + '/api/historialFamiliarCita';

@Injectable({
  providedIn: 'root'
})
export class HistorialFamiliarCitaService {

  constructor(private https: HttpClient) { }

  findAll() {
    return this.https.get(baseUrl);
  }

  findByPk(id_cita, rellenado_por_paciente) {
    return this.https.get(`${baseUrl}/${id_cita}/${rellenado_por_paciente}`);
  }

  create(data) {
    return this.https.post(baseUrl, data);
  }

  update(id_cita, rellenado_por_paciente, data) {
    return this.https.put(`${baseUrl}/${id_cita}/${rellenado_por_paciente}`, data);
  }

  delete(id_cita, rellenado_por_paciente) {
    return this.https.delete(`${baseUrl}/${id_cita}/${rellenado_por_paciente}`);
  }

}


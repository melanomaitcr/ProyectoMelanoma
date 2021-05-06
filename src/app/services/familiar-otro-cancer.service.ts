import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//const baseUrl = 'http://melanomaitcr.pythonanywhere.com/api/familiarOtroCancer';
const baseUrl = window.location.origin + '/api/familiarOtroCancer';

@Injectable({
  providedIn: 'root'
})
export class FamiliarOtroCancerService {

  constructor(private https: HttpClient) { }

  findAll() {
    return this.https.get(baseUrl);
  }

  findByPk(id_cita, rellenado_por_paciente, tipo_cancer, parentesco) {
    return this.https.get(`${baseUrl}/${id_cita}/${rellenado_por_paciente}/${tipo_cancer}/${parentesco}`);
  }

  create(data) {
    return this.https.post(baseUrl, data);
  }

  update(id_cita, rellenado_por_paciente, tipo_cancer, parentesco, data) {
    return this.https.put(`${baseUrl}/${id_cita}/${rellenado_por_paciente}/${tipo_cancer}/${parentesco}`, data);
  }

  delete(id_cita, rellenado_por_paciente, tipo_cancer, parentesco) {
    return this.https.delete(`${baseUrl}/${id_cita}/${rellenado_por_paciente}/${tipo_cancer}/${parentesco}`);
  }

}


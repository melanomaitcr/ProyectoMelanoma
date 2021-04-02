import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService) {
    this.autenticacionService.removeData();

  }

  ngOnInit(): void {
  }

}

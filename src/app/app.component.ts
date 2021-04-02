import { Component } from '@angular/core';
import { AutenticacionService } from './services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoMelanoma';

  constructor(private autenticacionService: AutenticacionService) { }
}

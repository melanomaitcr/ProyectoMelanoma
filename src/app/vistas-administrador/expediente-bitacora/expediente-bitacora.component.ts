import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expediente-bitacora',
  templateUrl: './expediente-bitacora.component.html',
  styleUrls: ['./expediente-bitacora.component.scss']
})
export class ExpedienteBitacoraComponent implements OnInit {
  resultado: []
  nombreArchivo: string
  tipo: string
  constructor(
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<ExpedienteBitacoraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.cedulaExpediente = this.route.snapshot.paramMap.get('cedula');
    this.resultado = this.data['resultado']
    this.nombreArchivo = this.data['nombreArchivo']
    this.tipo = this.data['tipo']
  }

  cerrar() {
    this.referenciaDialogo.close();
  }

}

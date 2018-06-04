import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { QueueDB } from '../models/queueDB.entity';
import { DatabaseService } from '../../services/api/database.service';
import { Database } from '../models/database.entity';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
import { Field } from '../models/database.entity';
@Component({
  selector: 'app-queuedb-detail',
  templateUrl: './queuedb-detail.component.html',
  styleUrls: ['./queuedb-detail.component.css']
})
export class QueuedbDetailComponent implements OnInit {

  public database: Database;
  public queueDB: QueueDB;
  public tiposCampos;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.database = new Database();
    this.database.nombre = '';
    this.database.descripcion = '';
    this.database.campos = new Array<Field>();
    this.databaseService.getQueueDatabase(id).subscribe(response => {
      this.queueDB = response.json();
      this.database.nombre = this.queueDB.nombre;
      this.database.descripcion = this.queueDB.descripcion;
    });
    this.tiposCampos = this.databaseService.tiposCampos();
  }

  anadirCampo() {
    let field = new Field();
    field.nombre = '';
    field.tipo = '';
    this.database.campos.push(field);
  }
  async onSubmit(databaseForm) {

    const result = await this.databaseService.createDatabase(this.database);
    result.subscribe(
      async response => {
        const resultDelete = await this.databaseService.deleteQueueDB(this.queueDB);
        resultDelete.subscribe(responseDelete =>{
          this.openDialog("Petición de base de datos añadida correctamente", "green", "done");
          this.router.navigate(['visualizer/home/adminpanel/queuedblist']);
        });
      },
      error => {
        this.openDialog("Error al modificar los datos", "red", "error");
        console.log(<any>error);
      }
    );
  }

  openDialog(message, color, icon) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message, color: color, icon: icon },
    });
  }

}

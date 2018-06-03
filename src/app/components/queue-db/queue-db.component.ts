import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QueueDB } from '../models/queueDB.entity';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
import { DatabaseService } from '../../services/api/database.service';
import { UserService } from '../../services/api/user.service';
@Component({
  selector: 'app-queue-db',
  templateUrl: './queue-db.component.html',
  styleUrls: ['./queue-db.component.css'],
})
export class QueueDbComponent implements OnInit {
public queueDB: QueueDB;
  constructor(private databaseService: DatabaseService, private _userService: UserService, private _dialog: MatDialog) {

  }

  ngOnInit() {
    this.queueDB = new QueueDB();
    this.queueDB.url = '';
    this.queueDB.descripcion = '';
    this.queueDB.nombre = '';
  }
  
  async onSubmit(queueDBdataForm) {
    const result =  await this.databaseService.createQueueDB(this.queueDB);
    result.subscribe(
      response => {
        this.openDialog("Petición de base de datos añadida correctamente", "green", "done");
      },
      error => {
        this.openDialog("Error al modificar los datos", "red", "error");
        console.log(<any>error);
      }
    );
    this.queueDB.url = '';
    this.queueDB.descripcion = '';
    this.queueDB.nombre = '';
    queueDBdataForm.reset({
      nombre: this.queueDB.nombre, descripcion: this.queueDB.descripcion, url: this.queueDB.url
    });
  }

  openDialog(message, color, icon) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message, color: color, icon: icon },
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
import { VizService } from '../../services/api/viz.service';
import { Visualization, Opcion } from '../models/visualization.entity';
import { Database } from '../models/database.entity';
@Component({
  selector: 'app-vizqueue-detail',
  templateUrl: './vizqueue-detail.component.html',
  styleUrls: ['./vizqueue-detail.component.css']
})
export class VizqueueDetailComponent implements OnInit {

  public viz: Visualization;
  public vizInfo;
  public tiposCampos;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vizService: VizService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.viz = new Visualization();
    this.viz.nombre = '';
    this.viz.url = '';
    this.viz.img = '';
    this.viz.databases = new Array<any>();
    this.viz.options = new Array<Opcion>();
    this.vizInfo = new Object();
    this.vizService.getVizById(id).subscribe(response => {
      this.viz = response;
      this.viz.options.forEach(opcion => {
        try {
          this.vizInfo[opcion.nombre] = JSON.parse(opcion.valor);
        } catch (error) {
          this.vizInfo[opcion.nombre] = opcion.valor;
        }
      });
    });
  }

  async onSubmit(vizqueueForm) {
    const result = this.vizService.updateVizById(this.viz);
    result.subscribe(
      async response => {
        this.openDialog("Petición de base de datos añadida correctamente", "green", "done");
        this.router.navigate(['home/adminpanel/vizqueuelist']);
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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Visualization } from '../models/visualization.entity';
import { DatabaseService } from '../../services/api/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VizService } from '../../services/api/viz.service';
@Component({
  selector: 'app-vizqueue-list',
  templateUrl: './vizqueue-list.component.html',
  styleUrls: ['./vizqueue-list.component.css']
})
export class VizqueueListComponent implements OnInit {

  data: Array<any>;
  displayedColumns = ['nombre', 'url', 'algoritmo', 'cluster', 'databases', 'editar'];
  dataSource: MatTableDataSource<Visualization>;
  selection = new SelectionModel<Visualization>(true, []);

  constructor(private vizService: VizService, private route: Router) { }

  async ngOnInit() {
    const visualizations = this.vizService.getVisualizations();
    this.data = new Array<any>();
    visualizations.subscribe(response => {
      response.forEach(element => {
        element.options.forEach(opcion => {
          try {
            element[opcion.nombre] = JSON.parse(opcion.valor);
          } catch (error) {
            element[opcion.nombre] = opcion.valor;
          }
        });
        this.data.push(element);
      });
      this.dataSource = new MatTableDataSource<Visualization>(this.data);
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  async delete(viz) {
    let index: number = this.data.findIndex(d => d === viz);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Visualization>(this.dataSource.data);

    const deletedViz = await this.vizService.deleteViz(viz);
    deletedViz.subscribe();

  }

  editar(viz) {
    this.route.navigate(['visualizer/home/adminpanel/vizqueuedetail/' + viz._id]);
  }
}

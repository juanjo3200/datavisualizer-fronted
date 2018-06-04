import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Visualization} from '../models/visualization.entity';
import { DatabaseService } from '../../services/api/database.service';
import { QueueDB } from '../models/queueDB.entity';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-queuedb-list',
  templateUrl: './queuedb-list.component.html',
  styleUrls: ['./queuedb-list.component.css']
})
export class QueuedbListComponent implements OnInit {

  data: Array<any>;
  displayedColumns = ['nombre', 'descripcion', 'editar'];
  dataSource: MatTableDataSource<QueueDB>;
  selection = new SelectionModel<QueueDB>(true, []);

  constructor(private databaseService: DatabaseService, private route: Router) { }

  async ngOnInit() {
    const databases = await this.databaseService.getQueueDatabases();
    databases.subscribe(response => {
      this.data = response.json();
      this.dataSource = new MatTableDataSource<QueueDB>(this.data);
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

  editar(queueDB) {
    this.route.navigate(['visualizer/home/adminpanel/queuedbdetail/' + queueDB._id]);
  }
}

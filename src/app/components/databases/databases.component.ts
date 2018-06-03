import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Visualization } from '../models/visualization.entity';
import { Database, Field } from '../models/database.entity';
import { DatabaseService } from '../../services/api/database.service';
import { UserService } from '../../services/api/user.service';
@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent implements OnInit {
  data: Array<any>;
  displayedColumns = ['nombre', 'descripcion', 'campos'];
  dataSource: MatTableDataSource<Database>;
  selection = new SelectionModel<Database>(true, []);

  resultsLength = 0;
  constructor(private databaseService: DatabaseService, private userService: UserService, private _dialog: MatDialog) { }

  async ngOnInit() {
    if (this.isAdmin()) {
      this.displayedColumns.push('borrar');
    }
    const databases = await this.databaseService.getDatabases();
    databases.subscribe(response => {
      this.data = response.json();
      this.resultsLength = this.data.length;
      this.dataSource = new MatTableDataSource<Database>(this.data);
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


  async deleteSelected() {
    for (const database of this.selection.selected) {
      let index: number = this.data.findIndex(d => d === database);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Database>(this.dataSource.data);

      const deletedDB = await this.databaseService.deleteDatabase(database);
      deletedDB.subscribe();
    }
    this.selection.clear();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  isAdmin() {
    return this.userService.isAdmin();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'campos', 'select'];
  dataSource = new MatTableDataSource<Database>(Database_mock);
  selection = new SelectionModel<Database>(true, []);
  @ViewChild('step') step;
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

  constructor() {

  }

  ngOnInit() {
    console.log(this.step.completed);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}


export interface Database {
  nombre: string;
  descripcion: string;
  campos: Array<string>;
}

const Database_mock: Database[] = [{
  nombre: "ISOC",
  descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
  campos: ["unit", "year", "2011"]
},
{
  nombre: "ISOC1",
  descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
  campos: ["unit", "year", "2011"]
}
  ,
{
  nombre: "ISOC2",
  descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
  campos: ["unit", "year", "2011"]
}
  , {
  nombre: "ISOC3",
  descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
  campos: ["unit", "year", "2011"]
}];
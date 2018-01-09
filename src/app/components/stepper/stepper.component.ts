import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatStepper, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database, Field, Visualization, Database_mock } from '../models/visualization';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'campos', 'select'];
  dataSource = new MatTableDataSource<Database>(Database_mock);
  selection = new SelectionModel<Database>(true, []);
  visualization = new Visualization();

  preprocesamientoForm: FormGroup;
  algoritmoForm: FormGroup;
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

  constructor(private _dialog: MatDialog, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.preprocesamientoForm = this.fb.group({
      itemRows: this.fb.array([])
    });
  }

  initPreproRows() {
    return this.fb.group({
      database: '',
      pivot: '',
      join: '',
    });
  }
  get itemRows(): FormArray {
    return this.preprocesamientoForm.get('itemRows') as FormArray;
  }
  setPreprocess(arrayLength: number) {
    const selectedFGs = new Array<FormGroup>();
    for (let index = 0; index < arrayLength; index++) {
      selectedFGs.push(this.initPreproRows());
    }
    const selectedFormArray = this.fb.array(selectedFGs);
    this.preprocesamientoForm.setControl('itemRows', selectedFormArray);
  }

  clearPreproArray() {
    const control = <FormArray>this.preprocesamientoForm.controls['itemRows'];

    control.controls.splice(0);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  classFields(fields: Array<Field>) {
    return fields.filter(field => field.tipo === 'Clase');
  }

  firstStepCheck(stepper: MatStepper) {
    if (this.selection.selected.length > 0) {
      this.clearPreproArray();
      this.setPreprocess(this.selection.selected.length);
      stepper.next();
    } else {
      this.openDialog("No has seleccionado ninguna base de datos");
    }
  }



  openDialog(message) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message, color: "red", icon: "error" },
    });
  }
}


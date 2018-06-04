import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatStepper, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visualization, Opcion } from '../models/visualization.entity';
import { Database, Field } from '../models/database.entity';
import { DatabaseService } from '../../services/api/database.service';
import { VizService } from '../../services/api/viz.service';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'campos', 'select'];
  dataSource: MatTableDataSource<Database>;
  selection = new SelectionModel<Database>(true, []);
  visualization = new Visualization();
  algoritmosClusters;
  algoritmosTest;
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

  constructor(private databaseService: DatabaseService, private vizService: VizService, private _dialog: MatDialog, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  async ngOnInit() {
    const databases = await this.databaseService.getDatabases();
    databases.subscribe(response => {
      this.dataSource = new MatTableDataSource<Database>(response.json());
    });
    this.algoritmosClusters = this.vizService.algoritmosKmeans();
    this.algoritmosTest = this.vizService.algoritmosTest();
  }

  createForm() {
    this.preprocesamientoForm = this.fb.group({
      itemRows: this.fb.array([])
    });
    this.algoritmoForm = this.fb.group({
      nombre: '',
      algoritmo: '',
      claseCluster: this.fb.array([]),
      algoritmosTest: ['']
    });
  }

  initPreproRows(name) {
    return this.fb.group({
      database: name,
      nulos: '',
      join: ''
    });
  }
  initCluserRows(name) {
    return this.fb.group({
      database: name,
      cluster: ''
    });
  }
  get itemRows(): FormArray {
    return this.preprocesamientoForm.get('itemRows') as FormArray;
  }

  get claseCluster(): FormArray {
    return this.algoritmoForm.get('claseCluster') as FormArray;
  }

  setPreprocess(arraySelect) {
    const selectedFGs = new Array<FormGroup>();
    for (let index = 0; index < arraySelect.length; index++) {
      selectedFGs.push(this.initPreproRows(arraySelect[index].nombre));
    }
    const selectedFormArray = this.fb.array(selectedFGs);
    this.preprocesamientoForm.setControl('itemRows', selectedFormArray);
  }

  clearPreproArray() {
    const control = <FormArray>this.preprocesamientoForm.controls['itemRows'];

    control.controls.splice(0);
  }

  clearClusterArray() {
    const control = <FormArray>this.preprocesamientoForm.controls['claseCluster'];

    control.controls.splice(0);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  classField(fields: Array<Field>) {
    return fields.filter(field => field.tipo === 'Clase');
  }

  numberField(fields: Array<Field>) {
    return fields.filter(field => field.tipo === 'Númerico');
  }

  firstStepCheck(stepper: MatStepper) {
    if (this.selection.selected.length > 0) {
      this.clearPreproArray();
      this.setPreprocess(this.selection.selected);
      stepper.next();
    } else {
      this.openDialog("No has seleccionado ninguna base de datos", "red", "error");
    }
  }

  backSecondStep() {
    this.clearPreproArray();
  }

  backThirdStep() {
    this.clearClusterArray();
  }

  secondStepCheck(stepper: MatStepper) {
    let correctStep = true;
    //Si existe más de un elemento hay que definir elegir elegir al menos una columna por el que se hace join
    if (this.selection.selected.length > 1) {
      this.preprocesamientoForm.get('itemRows').value.forEach(element => {
        if (element.join.length <= 0) {
          correctStep = false;
        }
      });
    }
    if (correctStep) {
      stepper.next();
    } else {
      this.openDialog("Se debe de seleccionar un campo en JOIN para todas las bases de datos", "red", "error");
    }

    const selectedFGs = new Array<FormGroup>();
    for (let index = 0; index < this.selection.selected.length; index++) {
      selectedFGs.push(this.initCluserRows(this.selection.selected[index].nombre));
    }
    const selectedFormArray = this.fb.array(selectedFGs);
    this.algoritmoForm.setControl('claseCluster', selectedFormArray);
  }

  finalizar() {
    const viz = new Visualization();
    viz.nombre = '';
    viz.url = '';
    viz.img = '';
    viz.databases = new Array<string>();
    this.selection.selected.forEach(database => {
      viz.databases.push(database._id);
    });
    viz.options = new Array<Opcion>();
    //Parseamos a opciones el preprocesamiento

    const opcionPrepro = new Opcion();
    opcionPrepro.nombre = 'preprocesamiento';
    opcionPrepro.valor = JSON.stringify(this.preprocesamientoForm.value.itemRows);
    viz.options.push(opcionPrepro);

    const clustering = this.algoritmoForm.value;
    if (clustering.nombre) {
      viz.nombre = clustering.nombre;
      if (clustering.algoritmo !== '') {
        //Parseamos algoritmo
        const opcionAlgoritmo = new Opcion();
        opcionAlgoritmo.nombre = 'algoritmo';
        opcionAlgoritmo.valor = clustering.algoritmo;
        viz.options.push(opcionAlgoritmo);

        let correctStep = true;
        clustering.claseCluster.forEach(element => {
          if (element.cluster.length <= 0) {
            correctStep = false;
          }
        });
        if (correctStep) {
          //Parseo clustering
          const opcionClusters = new Opcion();
          opcionClusters.nombre = 'clusters';
          opcionClusters.valor = JSON.stringify(clustering.claseCluster);
          viz.options.push(opcionClusters);
          if (clustering.algoritmosTest.length > 0) {
            //Parseo algoritmos test
            const opcionTest = new Opcion();
            opcionTest.nombre = 'algoritmosTest';
            opcionTest.valor = JSON.stringify(clustering.algoritmosTest);
            viz.options.push(opcionTest);

            const vizAdded = this.vizService.addViz(viz);
            this.openDialog("Visualización añadida correctamente", "green", "done");
            this.router.navigate(['visualizer/home/imagegrid']);
          } else {
            this.openDialog("Selecciona al menos un algoritmo con el que testear los clusters", "red", "error");
          }
        } else {
          this.openDialog("Selecciona al menos un campo por el que agrupar", "red", "error");
        }
      } else {
        this.openDialog("Selecciona un algoritmo de procesamiento", "red", "error");
      }
    } else {
      this.openDialog("La visualización tiene que tener un nombre", "red", "error");
    }

  }

  openDialog(message, color, icon) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message, color: color, icon: icon },
    });
  }
}


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VizService } from '../../services/api/viz.service';
import { ActivatedRoute } from '@angular/router';
import { Visualization, Opcion } from '../models/visualization.entity';

// need to call this var tablau
// because it is referencing the tableau js library
declare var tableau: any;

@Component({
  selector: 'app-viz-view',
  templateUrl: './viz-view.component.html',
  styleUrls: ['./viz-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VizViewComponent implements OnInit {
  // now declare an instance var
  public vizReady = false;
  tableauViz: any;
  public vizInfo;
  public viz: Visualization;
  constructor(private vizService: VizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.viz = new Visualization();
    this.viz.nombre = '';
    this.viz.url = '';
    this.viz.img = '';
    this.viz.databases = new Array<any>();
    this.viz.options = new Array<Opcion>();
    this.vizInfo = new Object();
    const id = this.route.snapshot.paramMap.get('id');
    this.vizService.getVizById(id).subscribe(response => {
      this.viz = response;
      this.viz.options.forEach(opcion => {
        try {
          this.vizInfo[opcion.nombre] = JSON.parse(opcion.valor);
        } catch (error) {
          this.vizInfo[opcion.nombre] = opcion.valor;
        }
      });
      const placeholderDiv = document.getElementById('tableauViz');
      const url = this.viz.url;
      const options = {
        hideTabs: true,
        onFirstInteractive: function () {
          // The viz is now ready and can be safely used.
        }
      };
      this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
      // Create a viz object and embed it in the container div.
      this.vizReady = true;
    });

  }

}

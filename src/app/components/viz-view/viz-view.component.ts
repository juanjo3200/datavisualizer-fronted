import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VizService } from '../../services/api/viz.service';
import { ActivatedRoute } from '@angular/router';
import { Visualization } from '../models/visualization.entity';

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
  tableauViz: any;
  viz: Visualization;
  constructor(private vizService: VizService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.vizService.getVizById(id).subscribe(response => {
      this.viz = response;
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
    });

  }

}

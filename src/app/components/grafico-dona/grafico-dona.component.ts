import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() donutLabel: string[] = ['donutLabel'];
  @Input() donutData: number[] = [100];
  @Input() donutType: string = 'doughnut';
  @Input('nombre') leyenda: string = 'Leyenda';

  constructor() {
    // console.log('donutLabel: ', this.donutLabel);
    // console.log('donutData: ', this.donutData);
    // console.log('donutType: ', this.donutType);
  }

  ngOnInit() {
    // console.log('donutLabel: ', this.donutLabel);
    // console.log('donutData: ', this.donutData);
    // console.log('donutType: ', this.donutType);
  }

}

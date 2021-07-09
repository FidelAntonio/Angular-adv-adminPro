import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  title: string = "ventas2"
  doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  doughnutChartData: MultiDataSet = [[50, 150, 200]];
  colors: Color[] = [{ backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }];

//Otra graficas
  doughnutChartLabels1: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  doughnutChartData1: MultiDataSet = [[350, 450, 100]];
  colors1: Color[] = [{ backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }];

  constructor() {}

  ngOnInit(): void {}
}

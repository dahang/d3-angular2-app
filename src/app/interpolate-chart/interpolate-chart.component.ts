import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Observable, Subscription } from '@reactivex/rxjs';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-interpolate-chart',
  templateUrl: './interpolate-chart.component.html',
  styleUrls: ['./interpolate-chart.component.css']
})
export class InterpolateChartComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private dataSource: Array<number>;

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private observer: Observable<number>;
  private subscription: Subscription;

  private dataArray: any = [25, 26, 28, 32, 37, 45, 55, 70, 90, 120, 135, 150, 160, 168, 172, 177, 180];
  private dataYears: Array<string> =
  ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];

  private parseDate = d3.timeParse('%Y');

  constructor(private dataService: DataService) {
    // this.height = 200;
    // this.width = 500;
  }

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {

  }
  getData(): void {
    this.dataSource = this.dataService.generateData();
  }

  createChart(): void {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let yScale = d3.scaleLinear().domain([0, d3.max(this.dataArray)])
      .range([this.height, 0]);

    let xScale = d3.scaleTime().domain(<Date[]>d3.extent(this.dataYears, d => this.parseDate(d)))
      .range([0, this.width]);

    let yAxis = d3.axisLeft(yScale).ticks(6).tickPadding(15).tickSize(5);
    let xAxis = d3.axisBottom(xScale);
    let area = d3.area()
      .x((d: any, i: number) => {
        return xScale(this.parseDate(this.dataYears[i]));
      })
      .y0(this.height)
      .y1((d: any) => {
        return yScale(d);
      });

    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    let chartGroup = svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    chartGroup.append('path').attr('d', area(this.dataArray));
    chartGroup.append('g').attr('class', 'axis y')
      .call(yAxis);
    chartGroup.append('g').attr('class', 'axis x').attr('transform', 'translate(0 , ' + this.height + ')')
      .call(xAxis);

  }

}

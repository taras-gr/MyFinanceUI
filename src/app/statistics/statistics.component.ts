import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { StatisticsService } from '../shared/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {  
  barChart;
  barChartDataSource;
  barChartLabels = [];
  barChartData = [];

  pieChart;
  pieChartDataSource;
  pieChartLabels = [];
  pieChartData = [];
  
  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.barChart = this.generateChart('barChart', 'bar', 'Expenses by date: ', this.barChartLabels, this.barChartData);
    this.pieChart = this.generateChart('pieChart', 'pie', 'Expenses by category', this.pieChartLabels, this.pieChartData);
  }

  getStats() {
    this.getUserStats();
  }

  getUserStats() {
    this.barChartLabels = [];
    this.barChartData = [];

    this.pieChartLabels = [];
    this.pieChartData = [];

    const userName = localStorage.getItem('userName');
    this.statisticsService.getUserSatsByProperty(userName, 'expenseDate').subscribe(
      (res: any) => {
        console.log(res);
        this.barChartDataSource = res;
        this.barChartDataSource.forEach(element => {
          this.barChartLabels.push(element.day);
          this.barChartData.push(element.costs);
        });

        this.barChart.data.labels = [];
        this.barChart.data.datasets[0].data = [];

        this.barChart.data.labels = this.barChartLabels;
        this.barChart.data.datasets[0].data = this.barChartData;

        this.barChart.update();
        
      },
      err => {
        // if (err.status == 400)
        //   //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        // else
        //   console.log(err);
      }
    );


    this.statisticsService.getUserSatsByProperty(userName, 'category').subscribe(
      (res: any) => {
        console.log(res);
        this.barChartDataSource = res;
        this.barChartDataSource.forEach(element => {
          this.pieChartLabels.push(element.category);
          this.pieChartData.push(element.costs);
        });

        this.pieChart.data.labels = [];
        this.pieChart.data.datasets[0].data = [];

        this.pieChart.data.labels = this.pieChartLabels;
        this.pieChart.data.datasets[0].data = this.pieChartData;

        this.pieChart.update();
        
      },
      err => {
        // if (err.status == 400)
        //   //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        // else
        //   console.log(err);
      }
    );

  }

  generateChart(idOfHtmlElement: string, chartType: string, chartLabel: string, chartLabels: any[], chartData: any[]) : Chart{
    var canvas = <HTMLCanvasElement> document.getElementById(idOfHtmlElement);
    var ctx = canvas.getContext('2d');
    var chart = new Chart(ctx, {
    type: chartType,
    data: {
        labels: chartLabels,
        datasets: [{
            label: chartLabel,
            data: chartData,
            backgroundColor: 
                'rgba(63, 81, 181, 0.3)'
            ,
            borderColor: [
                //'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero: true
        //         }
        //     }]
        // }
    }
    }
    );    

    return chart;
  }

}

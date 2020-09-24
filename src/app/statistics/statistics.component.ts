import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Chart from 'chart.js';
import { StatisticsService } from '../shared/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  dataSource;
  dsLabels = [];
  dsData = [];
  myChart;
  
  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.constructBarChart();
  }
  
  getUserStatsByExpenseDate() {
    this.dsData = [];
    this.dsLabels = [];
    const userName = localStorage.getItem('userName');
    this.statisticsService.getUserSatsByExpenseDate(userName).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = res;
        this.dataSource.forEach(element => {
          this.dsLabels.push(element.day);
          this.dsData.push(element.costs);
        });

        this.myChart.data.labels = [];
        this.myChart.data.datasets[0].data = [];

        this.myChart.data.labels = this.dsLabels;
        this.myChart.data.datasets[0].data = this.dsData;

        this.myChart.update();
        
      },
      err => {
        // if (err.status == 400)
        //   //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        // else
        //   console.log(err);
      }
    );
  }

  constructBarChart() {
    var canvas = <HTMLCanvasElement> document.getElementById('myChart');
    var ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: this.dsLabels,
        datasets: [{
            label: 'Daily expenses for period: ',
            data: this.dsData,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)'
            ,
            borderColor: [
                //'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });
  }

}

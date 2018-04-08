import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


import './chart.html';

import { ReactiveDict } from 'meteor/reactive-dict';

// myTemplate.js
Template.Chart.capTableChart = function() {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: this.title + "'s cap table"
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          },
          connectorColor: 'silver'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'genre',
      data: [
        ['King of cotelett',   76.0],
        ['Martin',       4.0],
        ['Andi',   4.0],
        ['Daniel',    4.0],
        ['Kevin',     4.0],
        ['Chris',    4.0],
        ['Felix',     4.0],
        ['Marvin',     4.0],
        ['Frank',     4.0]
      ]
    }]
  };
};



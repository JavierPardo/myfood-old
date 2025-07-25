import React from 'react';
import HighchartsReact from 'highcharts-react-official'
import Spinner from '../components/Spinner';

export default function PieChartCard({ ...props }) {
  const { highcharts, title, titleExport, order, data, loading } = props;
  if(!loading){
      var options = {
        chart: {
          type: 'pie',
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false,
          chartOptions: {
            title: {
              text: 'placeholder'
            },
            plotOptions: {
              pie: {
                size: 200,
                dataLabels: {
                  enabled: true,
                  formatter: function() {
                    return this.percentage.toFixed(2) + '%';
                  }
                },
                showInLegend: false,
              }
            },
          }
        },
        title: {
          text: "placeholder",
        },
        noData: {
          useHTML: true
        },

        plotOptions: {
          pie: {
            size: 200,
            dataLabels: {
              enabled: true,
              formatter: function() {
                return this.percentage.toFixed(2) + '%';
              }
            },
            tooltip: {
              headerFormat: '<b>Cantidad registros</b><br>',
              pointFormat: '{point.y}',
            },
            showInLegend: true,
          }
        },

        series: [{
          keys: ["y", "name"],
          type: "pie",
        }]
      }

      options.order = order;

      options.title.text = title;
      options.exporting.chartOptions.title.text = titleExport;

      options.series[0].name = title;
      options.series[0].data = [];
      data.forEach( function(valor) {
          var values = [];
          values.push(valor.data);
          values.push(valor.label);
          options.series[0].data.push(values);
      });

      return  <HighchartsReact
                highcharts={highcharts}
                options={options}
              />
  } else {
    return <Spinner show={loading} />;
  }
}
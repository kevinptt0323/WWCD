import React from 'react';
import { connect } from 'react-redux';
import Highcharts from 'react-highcharts'

import Paper from 'material-ui/Paper';

const mapStateWithProps = state => ({
  username: 'BIGGGG',
});

const config = {
  chart: {
    backgroundColor: {
      linearGradient: { x1:0, y1:0, x2:1, y2:1 },
      stops: [
        [0, "#2a2a2b"],
        [1, "#3e3e40"]
      ]
    },
    zoomType: 'x'
  },
  title: {
    text: '經過人數統計',
    style: { color: "#ccc" }
  },
  subtitle: {
    text: 'Customer traffic',
    style: { color: "#aaa" }
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    min: 0,
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(255, 123, 0, 1)'],
          [1, 'rgba(255, 123, 0, 0)']
        ]
      },
      marker: {
        radius: 2
      },
      lineWidth: 1,
      threshold: null
    }
  },

  series: [{
    type: 'area',
    data: []
  }]
}

@connect(mapStateWithProps)
class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    fetch(`http://pubg.nctu.me:8000/v1/statistic/time_series/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.data });
        const chart = this.chart.getChart();
        const series = chart.series[0];
        const points = data.data.forEach(({count, start,}, idx) => {
          series.addPoint([new Date(start).getTime(), count], false);
        });
        chart.redraw();
      });
  }
  render() {
    return (
      <div>
        <Highcharts config={config} ref={node => { this.chart = node; }} />
      </div>
    );
  }
}

export default Statistic;

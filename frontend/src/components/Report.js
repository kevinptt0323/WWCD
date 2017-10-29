import React from 'react';
import { connect } from 'react-redux';
import Highcharts from 'react-highcharts'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper';

const config = {
  chart: {
    type: 'pie',
    backgroundColor: {
      linearGradient: { x1:0, y1:0, x2:1, y2:1 },
      stops: [
        [0, "#2a2a2b"],
        [1, "#3e3e40"]
      ]
    },
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: '售出物品統計',
    style: { color: "#ccc" },
  },
  subtitle: {
    text: 'Sold Goods',
    style: { color: "#aaa" },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      depth: 45
    }
  },
  series: [{
    name: 'Amount',
    data: []
  }]
};

const mapStateWithProps = state => ({
  username: 'NCTU',
});

@connect(mapStateWithProps)

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    fetch(`http://pubg.nctu.me:8000/v1/transaction/${this.props.username}/report/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.data });
        const chart = this.chart.getChart();
        const series = chart.series[0];
        const points = data.data.map(({ item_name, amount }) => [item_name, amount]);
        series.setData(points);
      });
  }
  render() {
    const {
      data
    } = this.state;
    return (
      <Paper>
        <Highcharts config={config} ref={node => { this.chart = node; }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography type="subheading">Goods Name</Typography></TableCell>
              <TableCell><Typography type="subheading">Amount</Typography></TableCell>
              <TableCell><Typography type="subheading">Total</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.item_name}>
                <TableCell>{ d.item_name }</TableCell>
                <TableCell>{ d.amount }</TableCell>
                <TableCell>{ d.total }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Report;


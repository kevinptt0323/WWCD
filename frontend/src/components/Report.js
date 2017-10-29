import React from 'react';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const mapStateWithProps = state => ({
  username: 'BIGGGG',
});

@connect(mapStateWithProps)

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    fetch(`http://pubg.nctu.me:8000/v1/transaction/${this.props.username}/report/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.data });
      });
  }
  render() {
    const {
      data
    } = this.state;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>item_name</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>total</TableCell>
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

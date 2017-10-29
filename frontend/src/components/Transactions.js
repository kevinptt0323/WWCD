import React from 'react';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper';

const mapStateWithProps = state => ({
  username: 'BIGGGG',
});

@connect(mapStateWithProps)
class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    fetch(`http://pubg.nctu.me:8000/v1/transaction/${this.props.username}/transac/`)
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
              <TableCell><Typography type="subheading">Transaction Time</Typography></TableCell>
              <TableCell><Typography type="subheading">Item Name</Typography></TableCell>
              <TableCell><Typography type="subheading">Amount</Typography></TableCell>
              <TableCell><Typography type="subheading">Price</Typography></TableCell>
              <TableCell><Typography type="subheading">Payment</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.id}>
                <TableCell>{ d.transaction_time }</TableCell>
                <TableCell>{ d.item_name }</TableCell>
                <TableCell>{ d.amount }</TableCell>
                <TableCell>{ d.price }</TableCell>
                <TableCell>{ d.payment }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Transactions;

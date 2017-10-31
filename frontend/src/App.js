import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan'
import deepOrange from 'material-ui/colors/deepOrange'
import grey from 'material-ui/colors/grey'

import {
  Appbar,
  Transactions,
  Report,
  Statistic,
  Manage,
  Setting,
} from './components';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: deepOrange,
    type: 'dark',
  },
});

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    background: grey[900],
  }
};

@withStyles(styles)
@withRouter
class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classNames(classes.root)}>
          <Appbar />
          <div style={{ overflow: 'auto' }}>
            <Switch>
              <Route exact path="/transactions" component={Transactions}/>
              <Route exact path="/report" component={Report}/>
              <Route exact path="/statistic" component={Statistic}/>
              <Route exact path="/manage" component={Manage}/>
              <Route exact path="/setting" component={Setting}/>
              <Redirect from='/' to='/transactions' />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan'

import {
  Appbar,
  Statistic,
} from './components';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    type: 'dark',
  },
});

@withRouter
class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
          <Appbar />
          <Switch>
            <Route exact path="/statistic" component={Statistic}/>
            <Route exact path="/logs" component={Statistic}/>
            <Route exact path="/manage" component={Statistic}/>
            <Route exact path="/setting" component={Statistic}/>
            <Redirect from='/' to='/logs' />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;

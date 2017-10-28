import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan'

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
    primary: cyan,
  },
});

const styles = {
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    paddingTop: '112px' 
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
          <Switch>
            <Route exact path="/transactions" component={Transactions}/>
            <Route exact path="/report" component={Report}/>
            <Route exact path="/statistic" component={Statistic}/>
            <Route exact path="/manage" component={Manage}/>
            <Route exact path="/setting" component={Setting}/>
            <Redirect from='/' to='/transactions' />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

@withRouter
class Appbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      location: {
        pathname
      }
    } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Typography type="title">
            WWCD
          </Typography>
        </Toolbar>
        <Tabs
          fullWidth centered
          value={pathname.slice(1)}
          textColor="accent"
        >
          <Tab
            component={Link}
            to="/transactions"
            value="transactions"
            label="交易紀錄"
          />
          <Tab
            component={Link}
            to="/report"
            value="report"
            label="報表"
          />
          <Tab
            component={Link}
            to="/statistic"
            label="統計資料"
            value="statistic"
          />
          <Tab
            component={Link}
            to="/manage"
            label="系統管理"
            value="manage"
          />
          <Tab
            component={Link}
            to="/setting"
            label="設定"
            value="setting"
          />
        </Tabs>
      </AppBar>
    );
  }
}

export default Appbar;

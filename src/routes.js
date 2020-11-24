import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/header';
import EmployeeSchedular from './screens/employeeSchedular';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  }
})
);

const Routes = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <CssBaseline />
      <Router>
        <Switch>
          <main className={classes.content}>
            <Route component={() => <h3>The page you are looking for does not exist.</h3>} />
            <Route exact path="/" component={EmployeeSchedular} />
          </main>
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;


import React, { PropTypes } from 'react';
import { Router, Route } from 'dva/router';

import IndexPage from './components/IndexPage';
import Demo from './components/Demo';
import Test from './components/Test';

const Routes = ({ history }) => 
  <Router history={history}>
    <Route path="/" component={IndexPage} />
    <Route path="/demo" component={Demo} />
    <Route path="/test" component={Test} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;

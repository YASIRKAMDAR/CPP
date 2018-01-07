import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CardBlock from './CreditCard/CardBlock';
import SingleCardBlock from './CreditCard/SingleCardBlock';

const App = () => {
    return (
      <Router>
        <div className="container">
          <Route exact={true} path='/' component={CardBlock}  />
          <Route exact={true} path='/' component={SingleCardBlock} />
          <Route exact={true} path='/creditcard' component={CardBlock}  />
          <Route exact={true} path='/singlecard' component={SingleCardBlock} />
        </div>
      </Router>
    );
};

export default App;

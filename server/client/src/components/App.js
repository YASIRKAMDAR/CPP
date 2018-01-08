import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CardBlock from './CreditCard/CardBlock';
import SingleCardBlock from './CreditCard/SingleCardBlock';
import BillingAddress from './CreditCard/BillingAddress';

const App = () => {
    return (
      <Router>
        <div className="container">
          <Route exact={true} path='/' component={CardBlock}  />
          { false  ? <Route exact={true} path="/" component={BillingAddress} /> : null }
          <Route exact={true} path='/' component={SingleCardBlock} />
          <Route exact={true} path='/creditcard/:data' component={CardBlock}  />
          <Route exact={true} path='/singlecard' component={SingleCardBlock} />
          <Route exact={true} path='/billingaddress' component={BillingAddress} />
          
        </div>
      </Router>
    );
};

export default App;

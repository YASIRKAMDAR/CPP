import React, { Component } from 'react';

import CardBlock from './CreditCard/CardBlock';
import SingleCardBlock from './CreditCard/SingleCardBlock';
import BillingAddress from './CreditCard/BillingAddress';

class App extends Component {
  render() {
    return (
      <div className="container">
        <CardBlock />
        <BillingAddress />
        <SingleCardBlock />
      </div>
    );
  }
}

export default App;

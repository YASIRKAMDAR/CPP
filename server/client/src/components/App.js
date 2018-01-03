import React, { Component } from 'react';

import CardBlock from './CreditCard/CardBlock';
import SingleCardBlock from './CreditCard/SingleCardBlock';

class App extends Component {
  render() {
    return (
      <div className="container">
        <CardBlock />
        <SingleCardBlock />
      </div>
    );
  }
}

export default App;

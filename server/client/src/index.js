import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import CardBlock from './components/CreditCard/CardBlock';
import SingleCardBlock from './components/CreditCard/SingleCardBlock';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/creditcard' component={CardBlock} />
        <Route path='/singlecard' component={SingleCardBlock} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();

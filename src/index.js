import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUp from './SignUp';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const RouterWrapper = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/user" component={SignUp} />
    </div>
  </Router>
)

ReactDOM.render(<RouterWrapper />, document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import NavBar from './navBar.jsx';
import Content from './content.jsx';

class Main extends Component {
  render() {

    return (
        <BrowserRouter>
          <div className="main">
            <Route component={NavBar} />
            <Route path='/:year/:month/:day' component={Content} />
          </div>
        </BrowserRouter>
    );
  }
}

export default Main;
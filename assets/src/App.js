import React from 'react';

import Login from "./components/login/index"
import Home from  "./components/home/index"
import {BrowserRouter, Switch, Route} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact  />
        <Route path="/home" component={Home} />
      
      </Switch>
        
    </BrowserRouter>
    
  );
}

export default App;

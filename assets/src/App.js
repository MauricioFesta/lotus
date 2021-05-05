import React from 'react';

import Login from "./components/login/index";
import Cadastro from "./components/login/cadastro";
import Home from  "./components/home/index";
import Curriculo from "./components/curriculo/index";
import {BrowserRouter, Switch, Route} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact  />
        <Route path="/home" component={Home} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/curriculo" component={Curriculo} />
      
      </Switch>
        
    </BrowserRouter>
    
  );
}

export default App;

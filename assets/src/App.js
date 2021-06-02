import React from 'react';

import Login from "./components/login/index";
import Cadastro from "./components/login/cadastro";
import Home from "./components/home/index";
import Curriculo from "./components/curriculo/index";
import { Cadastro as cadastro_curriculo } from "./components/curriculo/cadastro"
import VagasEmpresa from "./components/vagas/index.empresa"
import Vagas from "./components/vagas/index"
import Postagens from "./components/postagens/index"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./components/login/auth"
import CreateEmpresa from "./components/vagas/create.empresa"



const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      /* isAuthenticated() */ true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);


function App() {

  return (

    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/cadastro" component={Cadastro} exact />

        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/vagas" exact component={Vagas} />
        <PrivateRoute path="/vagas/empresas" component={VagasEmpresa} />
        <PrivateRoute path="/vagas/cadastro" component={CreateEmpresa } />
        <PrivateRoute path="/curriculo" component={Curriculo} exact />
        <PrivateRoute path="/curriculo/cadastro" component={cadastro_curriculo} />
        <PrivateRoute path="/postagens" component={Postagens} />


      </Switch>

    </BrowserRouter>

  );
}

export default App;

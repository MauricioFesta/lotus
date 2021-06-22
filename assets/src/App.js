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
import { isAuthenticated,isAuthenticatedUser,isAuthenticatedEmpresa, isEmpresa } from "./components/login/auth"
import CreateEmpresa from "./components/vagas/create.empresa"
import PostCreateEmpresa from "./components/postagens/create.empresa"
import Perfil from "./components/perfil"
import Navbar from "./components/navbar"
import NavbarEmpresa  from "./components/navbar/index.empresa"
require("./css/style.scss")

const PrivateRouteUser = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticatedUser() ? (
        <>
          {isEmpresa() ?
            <NavbarEmpresa  />
            :
            <Navbar />
          }

          <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PrivateRouteEmpresa = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticatedEmpresa() ? (
        <>
          {isEmpresa() ?
            <NavbarEmpresa  />
            :
            <Navbar />
          }

          <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PrivateRouteAny = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <>
          {isEmpresa() ?
            <NavbarEmpresa  />
            :
            <Navbar />
          }

          <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);


function App() {

  return (
    <>

      <BrowserRouter>

        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/cadastro" component={Cadastro} exact />
          <PrivateRouteAny path="/home" component={Home} />
          <PrivateRouteUser path="/vagas" exact component={Vagas} />
          <PrivateRouteEmpresa path="/vagas/empresas" component={VagasEmpresa} />
          <PrivateRouteEmpresa path="/vagas/cadastro" component={CreateEmpresa} />
          <PrivateRouteUser path="/curriculo" component={Curriculo} exact />
          <PrivateRouteUser path="/curriculo/cadastro" component={cadastro_curriculo} />
          <PrivateRouteUser path="/postagens" exact component={Postagens} />
          <PrivateRouteEmpresa path="/postagens/cadastro" component={PostCreateEmpresa} />
          <PrivateRouteAny path="/perfil" exact component={Perfil} />
        </Switch>

      </BrowserRouter>
    </>

  );
}

export default App;

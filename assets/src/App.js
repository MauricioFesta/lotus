import React from 'react';
import Login from "./components/login/index";
import CadastroLogin from "./components/login/cadastro";
import Home from "./components/home/index";
import Curriculo from "./components/curriculo/index";
import  Cadastro  from "./components/curriculo/cadastro"
import VagasEmpresa from "./components/vagas/index.empresa"
import Vagas from "./components/vagas/index"
import Postagens from "./components/postagens/index"
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
import { isAuthenticated, isAuthenticatedUser, isAuthenticatedEmpresa, isEmpresa } from "./components/login/auth"
import CreateEmpresa from "./components/vagas/create.empresa"
import PostCreateEmpresa from "./components/postagens/create.empresa"
import Perfil from "./components/perfil"
import Navbar from "./components/navbar"
import CandidatosEmpresa from "./components/vagas/candidatos.empresa"
import NavbarEmpresa from "./components/navbar/index.empresa"
import history from "./others/redirect"
import Details from "./components/vagas/details"
import ResetPassword from "./components/login/password-reset"
import VagasEmpresaEditar from "./components/vagas/editar-cadastradas.empresa"
import VagasFechadoEmpresa from "./components/vagas/index-fechado.empresa"
import PostagensEmpresa from "./components/postagens/index.empresa"
import PostEditEmpresa from "./components/postagens/edit.empresa"
import "./components/shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/shards-dashboard/styles/extras.1.1.0.min.css";

require("./css/style.scss")



const PrivateRouteUser = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticatedUser() ? (
        <>
          {isEmpresa() ?
            <NavbarEmpresa />
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
            <NavbarEmpresa />
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
            <NavbarEmpresa />
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
        <Router history={history}>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/cadastro" component={CadastroLogin} />
            <Route path="/redefinicao-senha" component={ResetPassword} />
            <PrivateRouteAny path="/home" component={Home} />
            <PrivateRouteUser path="/vagas" exact component={Vagas} />
            <PrivateRouteEmpresa path="/vagas/cadastradas" exact component={VagasEmpresa} />
            <PrivateRouteEmpresa path="/vagas/cadastradas/fechado" component={VagasFechadoEmpresa} />
            <PrivateRouteEmpresa path="/vagas/cadastro" component={CreateEmpresa} />
            <PrivateRouteEmpresa path="/vagas/candidatos/:id" component={CandidatosEmpresa} />
            <PrivateRouteUser path="/curriculo" component={Curriculo} exact />
            <PrivateRouteUser path="/curriculo/cadastro" component={Cadastro} />
            <PrivateRouteUser path="/postagens" exact component={Postagens} />
            <PrivateRouteEmpresa path="/postagens/cadastro" component={PostCreateEmpresa} />
            <PrivateRouteEmpresa path="/postagens/editar" component={PostEditEmpresa} />
            <PrivateRouteEmpresa path="/postagens/view" component={PostagensEmpresa} />
            <PrivateRouteAny path="/perfil" exact component={Perfil} />
            <PrivateRouteAny path="/vaga-details" exact component={Details} />
            <PrivateRouteAny path="/vaga-edit" exact component={VagasEmpresaEditar} />
          </Switch>

        </Router>

      </BrowserRouter>
    </>

  );
}

export default App;

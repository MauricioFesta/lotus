import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import $ from "jquery";
import { getUser } from "../../stores/login/api"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var jwt = require('jsonwebtoken');


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="lotus">
        Lotus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.pinimg.com/564x/66/cd/5f/66cd5f6e109a082583891f363fa3f1c8.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login_view(props) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>

      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Relembrar me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.validaLogin}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="cadastro" variant="body2">
                  {"Não tenho conta ainda ? Cadastre-se"}
                </Link> */}
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {isOpen: false};
    this.validaLogin = this.validaLogin = this.validaLogin.bind(this);

  }

  async validaLogin() {


    let data = {

      email: $("#email").val(),
      senha: $("#senha").val()

    }

    let res = await getUser(data)

    if (res.data.Ok) {

      const secret = 'nSU&RSwGk3Yq@hM2g%LeU@1lFvSc1fnyG$l1Keqf8&W&xZKl&H';

      var token = jwt.sign({ logged: true, id: res.data.id, is_empresa: (res.data.is_empresa === 'true')}, secret, { expiresIn: '1h' })

      cookies.set('_A-T', res.data.token);
      cookies.set('_A-T-T_L', token);

      window.location.href = "/home"

    } else {

      this.setState({isOpen: true})

    }

  }

  render() {

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

 
    return (
      <>
        <Snackbar anchorOrigin={{  vertical: 'bottom', horizontal: 'right' }}  open={this.state.isOpen} autoHideDuration={6000} onClose={() => this.setState({isOpen: false})}>
          <Alert onClose={() => this.setState({isOpen: false})} severity="warning">
            Email ou senha incorretos
          </Alert>
        </Snackbar>
        <Login_view validaLogin={this.validaLogin} />
      </>

    );

  }
}




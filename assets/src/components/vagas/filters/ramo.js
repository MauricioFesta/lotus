import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { filterRamo } from "../../../stores/vagas/api"
import { observable } from 'mobx';
import { observer } from "mobx-react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Ramo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSendPesquisa = async () => {

    setOpen(false);
   

    let data = {
      tuple: `('alimentos')`
    }


    let res = await filterRamo(data)

    props.getVagas(res)


  }


  const handleClose = () => {
    setOpen(false);
  };




  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>Filtro por segmento da empresa</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Selecioe um Segmennto</DialogTitle>
        <DialogContent>
          <form className={classes.container}>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Segmennto</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={age}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="alimenntos">Alimentos</MenuItem>
                <MenuItem value="industria">Industria</MenuItem>
                <MenuItem value="comercio">Comércio</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendPesquisa} color="primary">
            Pesquisar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
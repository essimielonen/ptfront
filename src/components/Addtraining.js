import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default function Addtraining(props) {
console.log('addtraining props', props)
    
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: ''});

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
      props.addTraining({...training, date: moment(training.date._d).toISOString()});
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const handleCustomerChange = (event) => {
      setTraining({...training, [training.customer]: event.target.value});
    };

    const selectOptions = props.customers.map(customer => (
      <MenuItem value={customer.links[1].href}>{customer.firstname}{' '}{customer.lastname}</MenuItem>
    ))

    console.log(selectOptions)

    return(
        <div>
            <Button style={{margin: 10}} variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
                           <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            name="date"
                            value={training.date}
                            onChange={inputChanged}
                            label="Date (DD.MM.YYYY)"
                            fullWidth
                            />
                            
                            <TextField
                            margin="dense"
                            id="duration"
                            name="duration"
                            value={training.duration}
                            onChange={inputChanged}
                            label="Duration"
                            fullWidth
                            />
                            
                            <TextField
                            margin="dense"
                            id="activity"
                            name="activity"
                            value={training.activity}
                            onChange={inputChanged}
                            label="Activity"
                            fullWidth
                            />

<InputLabel id="customer">Customer</InputLabel>
        <Select
          labelId="customerLabel"
          id="customerLabel"
          value={training.customer}
          onChange={handleCustomerChange}
        >
          {selectOptions}
        </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}
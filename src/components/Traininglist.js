import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import moment from 'moment';

export default function Traininglist() {

const [trainings, setTrainings] = useState([]);
const [customers, setCustomers] = useState([]);
console.log('customers a t traininglist',customers)

const [open, setOpen] = useState(false);
const [msg, setMsg] = useState('');

useEffect(() => {
    getTrainings();
    getCustomers();

}, [])

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => {
        console.log('data at get trainings', data)
        setTrainings(data.content)
    })
    .catch(err => console.error(err))
}

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
    fetch(link, {method: 'DELETE'})
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('Training deleted');
            setOpen(true);
        })
        .catch(err => console.error(err))
}
}

const addTraining = (training) => {
    console.log('training at addtraining', training)
    fetch('https://customerrest.herokuapp.com/api/trainings',
        {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(training)
        }
    )
    .then(_ => getTrainings())
    .then(_ => {
        setMsg('New training added');
        setOpen(true);
    })
    .catch(err => console.error(err))
}

const updateTraining = (link, training) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(training) 
    })
    .then(_ => getTrainings())
    .then(_ => {
        setMsg('Training updated');
        setOpen(true);
    })
  } 

const handleClose = () => {
    setOpen(false);
}

const columns = [
    {
        Header: 'Date',
        accessor:'date',
        Cell: row => (moment(row.value).format('DD.MM.YYYY')),
        
    },

    {
        Header: 'Duration',
        accessor: 'duration',
        maxWidth: 150
        
    },
    {
        Header: 'Activity',
        accessor: 'activity'
    },
    {
        Cell: row => (<Edittraining training={row.original} updateTraining={updateTraining}/>),
        maxWidth: 150
    },
    {
        Cell: row => (<Button size="small" color="secondary" onClick={() => deleteTraining(row.original.links[0].href)}>Delete</Button>),
        maxWidth: 150
    },
    {
        Header: 'Customer',
        accessor: 'links[1].href'
    },
]

    return (
        <div>
            <Addtraining customers={customers} addTraining={addTraining} />
            <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns} />
            <Snackbar 
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={msg} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            />
        </div>
    );
}
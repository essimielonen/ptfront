import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {

const [customers, setCustomers] = useState([]);
const [open, setOpen] = useState(false);
const [msg, setMsg] = useState('');

useEffect(() => {
    getCustomers();
}, [])

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const addTraining = (link) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
        {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(link)
        }
    )
    .then(_ => getCustomers())
    .then(_ => {
        setMsg('New training added');
        setOpen(true);
    })
    .catch(err => console.error(err))
}

const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
    fetch(link, {method: 'DELETE'})
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer deleted');
            setOpen(true);
        })
        .catch(err => console.error(err))
}
}

const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
        {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(customer)
        }
    )
    .then(_ => getCustomers())
    .then(_ => {
        setMsg('New customer added');
        setOpen(true);
    })
    .catch(err => console.error(err))
}

const updateCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(customer) 
    })
    .then(_ => getCustomers())
    .then(_ => {
        setMsg('Customer updated');
        setOpen(true);
    })
  } 

const handleClose = () => {
    setOpen(false);
}

const columns = [
    {
       Cell: row => (<Addtraining customers={customers} training={row.original} addTraining={addTraining}/>)
    },
    {
        Header: 'Firstname',
        accessor:'firstname'

    },
    {
        Header: 'Lastname',
        accessor: 'lastname'
    },
    {
        Header: 'Postcode',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
    {
        Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer}/>)
    },
    {
        Cell: row => (<Button size="small" color="secondary" onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>)
    }
    
]

    return (
        <div>
            <Addcustomer addCustomer={addCustomer} />
            <h2>CUSTOMERS</h2>
            <ReactTable defaultPageSize={10} filterable={true} data={customers} columns={columns} />
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
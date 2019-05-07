import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import { CSVLink } from "react-csv";
import AddTraining from './AddTraining';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], open: false, message: '' };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  // Fetch customers
  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(jsondata => this.setState({ customers: jsondata.content }))
      .catch(err => console.error(err));
  };
  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(jsondata => this.setState({ customers: jsondata.content }))
      .catch(err => console.error(err));
  };
  addTraining = newTraining => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTraining)
    })
    .then(res => this.loadTrainings())
    .then(res => this.setState({open: true, message: 'New training saved'}))
    .then(res => this.loadCustomers())
    .catch(err => console.error(err));    
  }
  // Delete customers
  deleteCustomer = customerLink => {
    if(window.confirm("Are you sure?")) {
      fetch(customerLink, { method: "DELETE" })
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'Customer deleted'}))
        .catch(err => console.error(err));
    }
  };

  addCustomer = newCustomer => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
    .then(res => this.loadCustomers())
    .then(res => this.setState({open: true, message: 'New customer saved'}))
    .catch(err => console.error(err));    
  }
  

  editCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
    .then(res => this.setState({open: true, message: 'Changes saved'}))
    .catch(err => console.error(err));    
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
    
      {
        Header: "Firstname",
        accessor: "firstname"
      },
      {
        Header: "Lastname",
        accessor: "lastname"
      },
      {
        Header: "Adress",
        accessor: "streetaddress"
      },
      {
        Header: "Postcode",
        accessor: "postcode"
      },
      {
        Header: "City",
        accessor: "city"
      }, {
        Header: "Email",
        accessor: "email"
      }, {
        Header: "Phone",
        accessor: "phone"
      },{
        Header: "",
        filterable: false,
        sortable: false,
        width: 150,
        accessor: "links.0.href",
        Cell: ({value, row}) => (<AddTraining addTraining={this.addTraining} customer={row} link={value} />)

      },{
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links.0.href",
        Cell: ({value, row}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)

      },{
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links.0.href",
        Cell: ({ value }) => (
          <Button color="secondary" size="small" onClick={() => this.deleteCustomer(value)}>Delete</Button>
        )
      }
    ];

    return (
      <div>
        <AddCustomer addCustomer={this.addCustomer} />
        <CSVLink separator={";"} data={this.state.customers}>Download CSV</CSVLink>;
        <ReactTable
          filterable={true}
          data={this.state.customers}
          columns={columns}
          defaultPageSize={15}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default Customers;

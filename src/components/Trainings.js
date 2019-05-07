import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

class Trainings extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false};
  }
  
  componentDidMount() {
    this.loadTrainings();
  }
  
  // Fetch trainings
  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
    .then(response => response.json())
    .then(jsondata => this.setState({ trainings: jsondata.content }))
    .catch(err => console.error(err));
  };
  

  deleteTraining = trainingLink => {
    if(window.confirm("Are you sure?")) {
      fetch(trainingLink, { method: "DELETE" })
      .then(res => this.loadTrainings())
      .then(res => this.setState({open: true, message: 'Training deleted'}))
      .catch(err => console.error(err));
    }
  };
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  
  render() {
    const columns = [
      
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Duration",
        accessor: "duration"
      },{
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links.0.href",
        Cell: ({ value }) => (
          <Button color="secondary" size="small" onClick={() => this.deleteTraining(value)}>Delete</Button>
          )
        }
      ];
      
      return (
        <div>
        <ReactTable
          filterable={true}
          data={this.state.trainings}
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

export default Trainings;

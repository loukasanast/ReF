import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@blueprintjs/core";
import { Cell, Column, Table } from "@blueprintjs/table";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            teams: []
          };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/teams')
          .then(res => this.setState({ teams: res.data }));
    }

    handleDelete(event) {
        axios.delete('http://localhost:3001/api/teams/' + event.target.dataset.id)
            .then(res => {
                this.setState({teams: this.state.teams.filter(team => team._id !== event.target.dataset.id)});
            }, err => {
                alert(err);
            });
    }

    createDataTable() {

    }

    render() {
        const nameCellRenderer = (rowIndex) => (
            <Cell>{this.state.teams[rowIndex].name}</Cell>
        );

        const cityCellRenderer = (rowIndex) => (
            <Cell>{this.state.teams[rowIndex].city}</Cell>
        );

        const yearCellRenderer = (rowIndex) => (
            <Cell>{this.state.teams[rowIndex].year}</Cell>
        );

        const updateCellRenderer = (rowIndex) => (
            <Cell><Link to={'/update/' + this.state.teams[rowIndex]._id}>Update</Link></Cell>
        );

        const deleteCellRenderer = (rowIndex) => (
            <Cell><a onClick={this.handleDelete} data-id={this.state.teams[rowIndex]._id}>Delete</a></Cell>
        );

        return(
            <>
                <h3>Soccer Teams</h3>
                <Table numRows={this.state.teams.length}>
                    <Column name="Club Name" cellRenderer={nameCellRenderer}/>
                    <Column name="City" cellRenderer={cityCellRenderer} />
                    <Column name="Year Founded" cellRenderer={yearCellRenderer} />
                    <Column name="" cellRenderer={updateCellRenderer} />
                    <Column name="" cellRenderer={deleteCellRenderer} />
                </Table>
                <Link className="bp3-button bp3-icon-add" to="/add" style={{marginTop: '12px'}}>Add new team</Link>
            </>
        );
    }
}

export default Home;
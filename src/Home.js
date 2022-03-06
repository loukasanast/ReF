import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

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

    render() {
        return(
            <>
                <h3>Soccer Teams</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Year</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map(team => (
                            <tr key={team._id}>
                                <td>{team.name}</td>
                                <td>{team.city}</td>
                                <td>{team.year}</td>
                                <td><Link to={'/update/' + team._id}>Update</Link></td>
                                <td><button type="button" onClick={this.handleDelete} data-id={team._id}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/add">Add new team</Link>
            </>
        );
    }
}

export default Home;
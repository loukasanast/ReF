import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add(props) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/teams/', {name, city, year})
            .then(res => {
                navigate("/");
            }, err => {
                alert(err);
            })
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return(
        <>
            <h3>Add new team</h3>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input type="text" name="name" value={name} onChange={handleNameChange} /></td>    
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td><input type="text" name="city" value={city} onChange={handleCityChange} /></td>    
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td><input type="text" name="year" value={year} onChange={handleYearChange} /></td>    
                        </tr>  
                    </tbody>
                </table>
                <button type="submit">Add</button>  
            </form>
            <Link to="/">Back to home</Link>
        </>
    );
}

export default Add;
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';

function Update(props) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3001/api/teams/'  + id, {name, city, year})
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

    useEffect(()=>{
        axios.get('http://localhost:3001/api/teams/' + id)
          .then(res => {
              setName(res.data.name);
              setCity(res.data.city);
              setYear(res.data.year);
          });
    },[])

    return(
        <>
            <h3>Update team</h3>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr className="bp3-form-group bp3-inline">
                            <td>Name:</td>
                            <td><input className="bp3-input" type="text" name="name" value={name} onChange={handleNameChange} /></td>    
                        </tr>
                        <tr className="bp3-form-group bp3-inline">
                            <td>City:</td>
                            <td><input className="bp3-input" type="text" name="city" value={city} onChange={handleCityChange} /></td>    
                        </tr>
                        <tr className="bp3-form-group bp3-inline">
                            <td>Year:</td>
                            <td><input className="bp3-input" type="text" name="year" value={year} onChange={handleYearChange} /></td>    
                        </tr>  
                    </tbody>
                </table>
                <button className="bp3-button bp3-icon-floppy-disk" type="submit" style={{marginBottom: '12px'}}>Update</button>  
            </form>
            <Link to="/">Back to home</Link>
        </>
    );
}

export default Update;
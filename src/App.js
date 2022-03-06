import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Add from './Add';
import Update from './Update';

class App extends Component {
  render() {
    return(
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </>
    );
  }
}

export default App;

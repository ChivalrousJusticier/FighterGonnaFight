import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';


function App() {
  return (
    <React.Fragment>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
          Lern gud!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    <div id="dork">
    ReactDOM.render(
    <p>Hello, world!</p>,
    document.getElementById('dork')
    </div>
    </React.Fragment>
  );



  
}

export default App;

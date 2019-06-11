import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './routes/Home'
import Pagetwo from './routes/Pagetwo'
import './styles/home.scss'
class App extends Component {
    render() { 
        return (
            <Router>
                <div id="container">
                    <h1 className="hello">React Calculator</h1>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/Pagetwo" component={Pagetwo} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
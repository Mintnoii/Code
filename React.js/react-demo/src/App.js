import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagetwo from './routes/Pagetwo'
import Calculator from './components/Calculator'
class App extends Component {
    render() {
        return (
            <Router>
                <div id="container">
                    <h1 className="hello">React Calculator</h1>
                    <ul>
                        <li>
                            <Link to="/">Calculator</Link>
                        </li>
                        <li>
                            <Link to="/result">Reversal Result</Link>
                        </li>
                    </ul>

                    <hr />
                    <div>
                        <Route exact path="/" component={Calculator} />
                        <Route path="/result" component={Pagetwo} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
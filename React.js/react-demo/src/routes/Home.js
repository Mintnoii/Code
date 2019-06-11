import React, { Component } from 'react';
import Calculator from '../components/Calculator'
import { Link } from "react-router-dom";
class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            data: ''
        }
        this.handleResultChange = this.handleResultChange.bind(this)
    }
    handleResultChange(val){
        this.setState({
            data: val
        })
    }
    render() {
        return (
            <div className="content">
                <Calculator onResultChange={this.handleResultChange} ></Calculator> 
                <Link to={`/Pagetwo?data=${this.state.data}`}>Reversal Result</Link>
            </div>
        );
    }
}

export default Home;
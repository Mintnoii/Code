import React, { Component } from 'react';
import Calculator from '../components/Calculator'
import store from '../store/index.js'

class Home extends Component {
    render() {
        return (
            <Calculator onResultChange={this.props.changedata} ></Calculator>  
        );
    }
}


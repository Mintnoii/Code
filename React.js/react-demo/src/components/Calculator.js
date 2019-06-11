import React, { Component } from 'react'
import '../styles/calculator.scss'
import NP from 'number-precision'

class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value1: '',
            value2: '',
            operator: '+',
            result: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    handleBtnClick() {
        let res
        switch(this.state.operator){
            case '+':
            res = NP.plus(this.state.value1, this.state.value2)
            break;
            case '-':
            res =  NP.minus(this.state.value1, this.state.value2)
            break;
            case '*':
            res = NP.times(this.state.value1, this.state.value2)
            break;
            case '/':
            res =  NP.divide(this.state.value1, this.state.value2)
            break;
        }
        this.setState({
            result: res
        })
        this.props.onResultChange(res);
    }
    render() {
        return (
            <div>
                Data1: 
                <input className="value" type="number" name="value1" value={this.state.value1} onChange={this.handleChange} />
                Operator: 
                <select id="operator" name="operator" value={this.state.operator} onChange={this.handleChange}>
                    <option value="+"> + </option>
                    <option value="-"> - </option>
                    <option value="*"> * </option>
                    <option value="/"> / </option>
                </select>
                <br/>
                Data2: 
                <input className="value" type="number" name="value2" value={this.state.value2} onChange={this.handleChange} />
                Calculation：
                <button onClick={this.handleBtnClick}>Get result</button>
                Result:
                <span className="result">{this.state.result}</span>
            </div>
        );
    }
}

export default Calculator
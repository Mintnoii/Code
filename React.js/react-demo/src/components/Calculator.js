import React, { Component } from 'react'
import '../styles/calculator.scss'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../store/actionCreators'
class Calculator extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                Data1: 
                <input className="value" type="number" name="value1" value={this.props.value1} onChange={e => this.props.updateInput1(e.target.value)} />
                Operator: 
                <select id="operator" name="operator" value={this.props.operator} onChange={e => this.props.updateOperator(e.target.value)}>
                    <option value="+"> + </option>
                    <option value="-"> - </option>
                    <option value="*"> * </option>
                    <option value="/"> / </option>
                </select>
                <br/>
                Data2: 
                <input className="value" type="number" name="value2" value={this.props.value2} onChange={e => this.props.updateInput2(e.target.value)} />
                Calculation：
                <button onClick={this.props.updateResult}>Get result</button>
                Result:
                <span className="result">{this.props.result}</span>
            </div>
        );
    }
}
// state.dispatch -> props
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(actionCreators, dispatch)
}
export default connect(state => state, mapDispatchToProps)(Calculator);
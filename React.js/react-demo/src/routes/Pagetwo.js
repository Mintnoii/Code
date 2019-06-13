import React, { Component } from 'react';
import {connect} from 'react-redux'
class Pagetwo extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
               将结果反转后得到：{this.props.reservaldata}
            </div>
        );
    }
}
export default connect(state=>state, null)(Pagetwo);
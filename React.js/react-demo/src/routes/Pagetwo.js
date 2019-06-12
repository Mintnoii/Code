import React, { Component } from 'react';
import {connect} from 'react-redux'
class Pagetwo extends Component {
    constructor(props){
        super(props)
        this.state = {
            reversedata: ''
        }
    }
    componentDidMount(){
        //let str = this.props.location.search.match(/\?data=(.*)/)[1]
        let str = this.props.resultdata.toString()
        console.log(str)
        this.setState({
            reversedata:  [...str].reverse().join('')
        })
    }
    render() {
        console.log(this.props.resultdata)
        return (
            <div>
               将结果反转后得到：{this.state.reversedata}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        resultdata: state.resultdata
    }
}
export default connect(mapStateToProps, null)(Pagetwo);
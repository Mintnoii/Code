import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Pagetwo extends Component {
    constructor(props){
        super(props)
        this.state={
            reversedata: ''
        }
    }
    componentDidMount(){
        let str = this.props.location.search.match(/\?data=(.*)/)[1]
        this.setState({
            reversedata:  [...str].reverse().join('')
        })
    }
    render() {
        return (
            <div>
               将结果反转后得到：{this.state.reversedata}
               <br/>
               <Link to="/">Back to Home</Link>
            </div>
        );
    }
}

export default Pagetwo;
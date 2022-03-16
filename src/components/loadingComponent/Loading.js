import React, {Component} from 'react';
import '../../styles/common.css';




export default class Screen1 extends Component {

    render(){
        
        return (
            <div id="loading" className="container"> 
                <h1>{this.props.message}</h1>
            </div>
        );
    }
}

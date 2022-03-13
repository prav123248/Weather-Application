import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';

export default class Screen3 extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
                
            <div id="screen3" className="container">   
                <Header />
                <h1>Screen 3 - Change stuff between header and toolbar</h1>
                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

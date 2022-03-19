import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'

export default class Screen3 extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
                
            <div id="screen3" className="container">   
                <Header />
                <div class="scrollableParent">
                    <h2>Trail Schedule</h2>


                </div>
                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

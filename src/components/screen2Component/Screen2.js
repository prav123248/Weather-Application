import React, {Component} from 'react';
import '../../styles/common.css';
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css';
import add from '../../assets/icons/add.png';
import subtract from '../../assets/icons/minus.png';
import $ from 'jquery';
import Dynamiccontainer from './Dynamiccontainer';

export default class Screen2 extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div id="screen2" className="container">   
                <Header condition={this.props.condition} />
                <Dynamiccontainer forecast={this.props.forecast}/>
                <Toolbar instance={this.props.instance} screen={2}  />
            </div>

            
        );
    }
}

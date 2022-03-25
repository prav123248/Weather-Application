import React, {Component} from 'react';
import '../../styles/common.css';
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css';
import Dynamiccontainer from './Dynamiccontainer';

export default class Screen2 extends Component {
    constructor(props) {
        super(props);
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The render method for this component renders the Header, DynamicContainer and Toolbar components.
    * 
    * The Header component is supplied with the condition prop so it knows which condition to display on screen. This part of screen 2 is just for the header.
    * The remaining screens encapsulated within this component is rendered through the DynamicContainer component. It allows the DynamicContainer component to 
    * focus solely on displaying the correct content for screen 2. The toolbar component accepts two props.
    *  
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */

    render(){
        return (
            <div id="screen2" className="container">   
                <Header condition={this.props.condition} />
                <Dynamiccontainer />
                <Toolbar instance={this.props.instance} screen={2}  />
            </div>

            
        );
    }
}

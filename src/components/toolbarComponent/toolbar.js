import React, {Component} from 'react';
import './toolbar.css';
import screen1icon from '../../assets/icons/screen1icon.png';
import screen2icon from '../../assets/icons/screen2icon.png';
import screen3icon from '../../assets/icons/screen3icon.png';

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The render method uses the passed prop screen to determine the opacity of three values, each representing the opacity of a respective screens icon. These are then displayed.
    * 
    * The opacity for each screen is initally set to 1. A passed prop will distinguish which screen the toolbar component is being used in and that alters the opacity level
    * of two variabes. Whichever screen is selected, the remaining two will have their opacity decreased. The render method will then return a div containing image tags for each 
    * icon of the taskbar. When one of the images are clicked, the screenSwitch method in the main index.js file is called to alter the screen to the specified value.
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */

    render(){
        var opacity1 = 1;
        var opacity2 = 1;
        var opacity3 = 1;
        
        if (this.props.screen === 1) {
            opacity2 = 0.4;
            opacity3 = 0.4;
        }
        else if (this.props.screen === 2) {
            opacity1 = 0.4;
            opacity3 = 0.4;
        }
        else {
            opacity1 = 0.4;
            opacity2 = 0.4;
        }


        return (
            <div className="toolbarContainer">
            <div className="toolbar">
                <img id="screen1icon" src={screen1icon} onClick={() => this.props.instance.screenSwitch(1)} style={{opacity : opacity1}} />
                <img id="screen2icon" src={screen2icon} onClick={() => this.props.instance.screenSwitch(2)} style={{opacity : opacity2}}/>
                <img id="screen3icon" src={screen3icon} onClick={() => this.props.instance.screenSwitch(3)} style={{opacity : opacity3}}/>
            </div>
            </div>

        );
    }
}

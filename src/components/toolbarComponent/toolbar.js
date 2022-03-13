import React, {Component} from 'react';
import './toolbar.css';
import screen1icon from '../../assets/icons/screen1icon.png';
import screen2icon from '../../assets/icons/screen2icon.png';
import screen3icon from '../../assets/icons/screen3icon.png';

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

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
            <div className="toolbar">
                <img id="screen1icon" src={screen1icon} onClick={() => this.props.instance.screenSwitch(1)} style={{opacity : opacity1}} />
                <img id="screen2icon" src={screen2icon} onClick={() => this.props.instance.screenSwitch(2)} style={{opacity : opacity2}}/>
                <img id="screen3icon" src={screen3icon} onClick={() => this.props.instance.screenSwitch(3)} style={{opacity : opacity3}}/>
            </div>


        );
    }
}

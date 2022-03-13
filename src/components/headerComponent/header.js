import React, {Component} from 'react';
import './header.css'
import profilelogo from '../../assets/profilesunny.png'

export default class header extends Component {

    render(){
        return (
                
            <div className="profileHeader">
                <img src={profilelogo}/>
            </div>
        );
    }
}

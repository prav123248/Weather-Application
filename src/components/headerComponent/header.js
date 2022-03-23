import React, {Component} from 'react';
import './header.css'
import rainprofile from '../../assets/icons/profilerain.png'
import sunnyprofile from '../../assets/icons/profilesunny.png'
import cloudyprofile from '../../assets/icons/profilecloud.png'

export default class header extends Component {

    render(){
        var weather = this.props.condition
        var image;

        if (weather === "Drizzle" || weather === "Rain" || weather === "Thunderstorm") {
            image = rainprofile
        }
        else if (weather === "Clear") {
            image = sunnyprofile
        }
        else {
            image = cloudyprofile
        }

        return (
                
            <div className="profileHeader">
                <img src={image}/>
            </div>
        );
    }
}

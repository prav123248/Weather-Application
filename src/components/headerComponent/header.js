import React, {Component} from 'react';
import './header.css'
import rainprofile from '../../assets/icons/profilerain.png'
import sunnyprofile from '../../assets/icons/profilesunny.png'
import cloudyprofile from '../../assets/icons/profilecloud.png'

export default class header extends Component {
   
    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Dynamically alters the image displayed depending on the value of the prop passed to it. 
    * 
    * The prop passed is a single word from the API call that summarises the current condition. If statements will compare this to certain conditions to determine
    * which image is best suited to be displayed. Rainy weather sets the image to the rain header and so on. The image is then outputted.
    * 
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */
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

import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import { saveSchedule } from '../saveData';
import Forecastpopup from '../ForecastpopupComponent/Forecastpopup';

export default class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false
        }
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method reverses the boolean state of a variable called trigger. It is used by a button and the state variable is used to determine whether popup components should be rendered or not.
    * 
    * The boolean of the trigger is reversed depending on its current state. In this component, the "Check Upcoming Forecast" button calls this method.
    * It will be used to determine whether a popup should be rendered or not. When it is true, it will render.
    * 
    * @param  ()  
    * @return ()
    */

    triggerChange = () => {
        if (this.state.trigger === true) {
            this.setState({trigger:false})       
        }
        else {
            this.setState({trigger:true})      
    
        }
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method checks the state of the trigger and if it is true, returns a Forecastpopup component to render with passed props "Upcoming weather" and 2.
    * 
    * The forecast popup is only rendered if the trigger state is set to true. That is when this method will return the popup component for it to be rendered.
    * 
    * 
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */

    popup = () => {
        if (this.state.trigger === true) {
            return <Forecastpopup title="Upcoming Weather" screen={2}  />
        }
    }

    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The render method presents the scheduling HTML aspect of the screen.
    * 
    * The render returns HTML code responsible for scheduling a hike. It calls the popup method below which can evaluate to a forecastpopup or nothing depending on the state of the trigger variable.
    * The button for scheduling will save the schedule submitted and then call a props variable that changes the selectedTrail state to "" which will present the user with the default screen.
    * 
    * 
    * @param  ()  
    * @return ()
    */
    render(){
        return (       
     
            <div class="scheduleHike">
                   
                    <h3>Schedule a Hike</h3>
                    <div class="formContainer">
                        <button class="scheduleButton" id="check" onClick={this.triggerChange} type="button">Check Upcoming Forecast</button>

                        
                        <input class="calendar" type="date" name="scheduledDate" id="dateSelector"/>
                        

                    <button class="scheduleButton" id="schedule" type="button" onClick={() => { saveSchedule(); this.props.changeTrail("");}}>Schedule</button>

                    </div>

                    {this.popup()}
                    
            </div>
                
            
        );
    }
}

import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import $ from 'jquery';
import { saveSchedule } from './saveData';
import Forecastpopup from '../ForecastpopupComponent/Forecastpopup';

export default class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false
        }
    }

    triggerChange = () => {
        if (this.state.trigger === true) {
            this.setState({trigger:false})       
        }
        else {
            this.setState({trigger:true})      
    
        }
    }

    popup = () => {
        if (this.state.trigger === true) {
            return <Forecastpopup title="Upcoming Weather" screen={2}  />
        }
    }
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

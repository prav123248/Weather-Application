import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import $ from 'jquery';


export default class Scheduler extends Component {
    constructor(props) {
        super(props);
    }



    render(){
        return (               
            <div class="scheduleHike">
                    <h3>Schedule a Hike</h3>
                    <div class="formContainer">
                        <button class="scheduleButton" id="check" type="button">Check Upcoming Forecast</button>

                        
                        <input class="calendar" type="date" name="scheduledDate"/>
                        

                        <button class="scheduleButton" id="schedule" type="button">Schedule</button>

                    </div>

                </div>

            
        );
    }
}

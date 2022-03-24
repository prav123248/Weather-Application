import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'
import $ from 'jquery';
import { readData } from '../screen2Component/readData';

//Icon imports
import cloudy from '../../assets/icons/cloudy.png'
import sunny from '../../assets/icons/sunny.png'
import rain from '../../assets/icons/rain.png'
import heavy from '../../assets/icons/heavy-rain.png'
import snow from '../../assets/icons/snow.png'
import direction from '../../assets/icons/direction.png'

export default class Screen3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trail: ""
        }

    }


    scheduledDescription = () => {
        if (this.state.trail === "") {
            return (
                <div class="scheduleDetailContainer">
                    <p class="basicMessage">Select a trail to view details or update the forecast</p>
                </div>
            )
        }
        else {
            return (
                <div class="scheduleDetailContainer">
                    <h3>Trail : {this.state.trail}</h3>
                    <p class="scheduleForecast">Last Checked : <img src={snow}/></p>
                    <div id="buttonContainer">
                        <button id="updateButton" type="button">Update Forecast</button>
                    </div>
                </div>
            )
        }
    }


    scheduleOnClick = () => {
        const self = this;
        $('.scheduledRow').on('click', function () {
            var el = $(this).children('.scheduleName').text();
            if (el !== "Trail Name") {
                self.changeTrail(el)
            }
        });        
    }

    changeTrail = (selectedTrail) => {
        this.setState({
            trail:selectedTrail
        })
    }

    componentDidMount() {
        this.scheduleOnClick();
        
    }

    displaySchedule = (scheduledTrails) => {

        if (scheduledTrails.length <= 0) {
            return (
                <div class="scheduleTable">
                    <p class="nonCapital">No trails have been scheduled. Schedule a trail
                    by selecting it in the trail list.
                    </p>
                </div>
            )
        }
        else {

            return (
                <div class="scheduleTable">
                    <table>
                        <tbody>
                            <tr class="scheduledRow">
                                <th class="scheduleDate">Date</th>
                                <th class="scheduleName">Trail Name</th>
                                <th class="scheduleForecast">Forecast</th>
                            </tr>

                            
                            {scheduledTrails.map((trail) => (
                                <tr class="scheduledRow">
                                    <td class="scheduleDate">{trail[5]}</td>
                                    <td class="scheduleName">{trail[0]}</td>
                                    {this.conditionIcon(trail[4])}
                                </tr>
                            ))} 
                            


                        </tbody>
                    </table>
                </div>

            )
        }
    }

    conditionIcon = (weather) => {

        if (weather === "Thunderstorm") {
            return <td class="scheduleForecast"><img src={heavy}/></td>
        } 
        else if (weather === "Drizzle" || weather === "Rain") {
            return <td class="scheduleForecast"><img src={rain}/></td>
        }
        else if (weather === "Snow") {
            return <td class="scheduleForecast"><img src={snow}/></td>
        }
        else if (weather === "Clear") {
            return <td class="scheduleForecast"><img src={sunny}/></td>
        }
        else if (weather === "Clouds") {
            return <td class="scheduleForecast"><img src={cloudy}/></td>
        }
        else {
            return <td class="scheduleForecast">N/A</td>
        }    
    }

    render(){


        var trailList = readData()
        var scheduledTrails = []

        for (var i=0; i<trailList.length; i++) {
            if (trailList[i][5] !== null) {
                scheduledTrails.push(trailList[i])
            }
        }

        return (
                
            <div id="screen3" className="container">   
                <Header condition={this.props.condition} />
                <div class="scheduleContainer">
                    <h2>Trail Schedule</h2>
                    {this.displaySchedule(scheduledTrails)}
                    
                </div>
                
                {this.scheduledDescription()}



                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

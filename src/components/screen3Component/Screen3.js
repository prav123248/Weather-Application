import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'
import $ from 'jquery';
import { readData } from '../screen2Component/readData';
import { removeHike } from '../screen2Component/removeData';
import Forecastpopup from '../ForecastpopupComponent/Forecastpopup';

//Icon imports
import cloudy from '../../assets/icons/cloudy.png'
import sunny from '../../assets/icons/sunny.png'
import rain from '../../assets/icons/rain.png'
import heavy from '../../assets/icons/heavy-rain.png'
import snow from '../../assets/icons/snow.png'
import direction from '../../assets/icons/direction.png'

export var hikeSelected;

export default class Screen3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trail: "",
            trigger: false
        }

    }

    changeHike = () => {
        this.setState({
            trail : ""
        })
        hikeSelected = ""
    }

    scheduledDescription = (scheduledTrails) => {
        if (this.state.trail === "") {
            return (
                <div class="scheduleDetailContainer">
                    <p class="basicMessage">Select a trail to view details or update the forecast</p>
                </div>
            )
        }
        else {
            hikeSelected = this.state.trail
            var hikeArray = ""
            for (var i=0; i<scheduledTrails.length; i++) {
                if (hikeSelected === scheduledTrails[i][0]) {
                    hikeArray = scheduledTrails[i]
                    break
                }
            }
            return (
                <div class="scheduleDetailContainer">
                    <h3>Trail : {this.state.trail}</h3>
                    <p class="scheduleForecast">Last Checked : {this.conditionIcon(hikeArray[4])}</p>
                    <div id="buttonContainer">
                        <button id="updateButton" onClick={this.changeTrigger} type="button">Update Forecast</button>
                        <button id="removeSchedule" onClick={() => { removeHike(); this.changeHike()}} type="button">Remove Hike</button>
                    </div>

                    {this.popup()}
                </div>
            )
        }
    }


    popup = () => {
        if (this.state.trigger === true) {
            return <Forecastpopup title="Forecasted Weather" trail={this.state.trail} screen={3}  />
        }        
    }

    changeTrigger = () => {
        if (this.state.trigger === true) {
            this.setState({trigger: false})
        }
        else {
            this.setState({trigger: true})
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
            trail:selectedTrail,
            trigger: false
        })
    }

    componentDidMount() {
        this.scheduleOnClick();
        
    }

    displaySchedule = (scheduledTrails) => {

        if (scheduledTrails.length <= 0) {
            return (
                <div class="scheduleTable">
                    <p class="nonCapital">No hikes have been scheduled. Schedule a hike
                    by selecting a saved trail in the trail list.
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
                                    <td class="scheduleForecast">{this.conditionIcon(trail[4])}</td>
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
            return <img src={heavy}/>
        } 
        else if (weather === "Drizzle" || weather === "Rain") {
            return <img src={rain}/>
        }
        else if (weather === "Snow") {
            return <img src={snow}/>
        }
        else if (weather === "Clear") {
            return <img src={sunny}/>
        }
        else if (weather === "Clouds") {
            return <img src={cloudy}/>
        }
        else {
            return "N/A"
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
                    <h2>Hike Schedule</h2>
                    {this.displaySchedule(scheduledTrails)}
                    
                </div>
                
                {this.scheduledDescription(scheduledTrails)}



                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

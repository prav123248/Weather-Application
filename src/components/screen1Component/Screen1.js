import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css'
import Header from '../headerComponent/header'
import Toolbar from '../toolbarComponent/toolbar'

//Icon imports
import cloudy from '../../assets/icons/cloudy.png'
import sunny from '../../assets/icons/sunny.png'
import rain from '../../assets/icons/rain.png'
import heavy from '../../assets/icons/heavy-rain.png'
import snow from '../../assets/icons/snow.png'
import direction from '../../assets/icons/direction.png'

export default class Screen1 extends Component {
    constructor(props) {
        super(props);
    }



    render(){
        const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        const today = new Date();
        const upcomingWeekIcons = []
        for (var i = 0; i < 7; i++) {
            var weather = this.props.upcomingData[i]['weather'][0]['main']
            if (weather === "Thunderstorm") {
                upcomingWeekIcons.push(heavy)
            } 
            else if (weather === "Drizzle" || weather === "Rain") {
                upcomingWeekIcons.push(rain)
            }
            else if (weather === "Snow") {
                upcomingWeekIcons.push(snow)
            }
            else if (weather === "Clear") {
                upcomingWeekIcons.push(sunny)
            }
            else {
                upcomingWeekIcons.push(cloudy)
            }

        }

        let longitudeDisplay = ""
        let latitudeDisplay = ""
        
        if (this.props.lat < 0) {
            latitudeDisplay = this.props.lat + "°S"
        }
        else {
            latitudeDisplay = this.props.lat + "°N"
        }

        if (this.props.long < 0) {
            longitudeDisplay = this.props.long + "°W"
        }
        else {
            longitudeDisplay = this.props.long + "°E"
        }



        return (
            <div id="screen1" className="container">   
                <Header condition={this.props.condition} />
                <div className="currentContainer">
                    <p id="Location">{latitudeDisplay}, {longitudeDisplay}</p>
                    <p id="temp">{Math.round(this.props.currentData.temperature)}°</p>
                    <p className="tempstats">Visibility : {this.props.currentData.visibility}</p>
                    <p className="tempstats">Humidity : {this.props.currentData.humidity}%</p>
                    <p className="tempstats nonCapital">
                        Wind : {this.props.currentData.windSpeed}m/s
                        <img style={{transform: `rotate(` + this.props.currentData.windDirection + `deg)`}} id="directionLogo" src={direction}/>
                    </p>
                    <p className="tempstats">{this.props.currentData.message['description']}</p>
                </div>

                <div className="upcomingContainer">
                    <table>
                        <tbody>
                            <tr>
                                <th>{weekdays[(today.getDay()+1) % 7]}</th>
                                <th>{weekdays[(today.getDay()+2) % 7]}</th>
                                <th>{weekdays[(today.getDay()+3) % 7]}</th>
                                <th>{weekdays[(today.getDay()+4) % 7]}</th>
                                <th>{weekdays[(today.getDay()+5) % 7]}</th>
                                <th>{weekdays[(today.getDay()+6) % 7]}</th>
                                <th>{weekdays[(today.getDay()+7) % 7]}</th>
                            </tr>

                            <tr>
                                <td>{Math.round(this.props.upcomingData[0]['temp']['max'])}</td>
                                <td>{Math.round(this.props.upcomingData[1]['temp']['max'])}</td>
                                <td>{Math.round(this.props.upcomingData[2]['temp']['max'])}</td>
                                <td>{Math.round(this.props.upcomingData[3]['temp']['max'])}</td>
                                <td>{Math.round(this.props.upcomingData[4]['temp']['max'])}</td>
                                <td>{Math.round(this.props.upcomingData[5]['temp']['max'])}</td>
                                <td>{Math.round(this.props.upcomingData[6]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td>{Math.round(this.props.upcomingData[0]['temp']['min'])}</td>
                                <td>{Math.round(this.props.upcomingData[1]['temp']['min'])}</td>
                                <td>{Math.round(this.props.upcomingData[2]['temp']['min'])}</td>
                                <td>{Math.round(this.props.upcomingData[3]['temp']['min'])}</td>
                                <td>{Math.round(this.props.upcomingData[4]['temp']['min'])}</td>
                                <td>{Math.round(this.props.upcomingData[5]['temp']['min'])}</td>
                                <td>{Math.round(this.props.upcomingData[6]['temp']['min'])}</td>
                            </tr>

                            <tr>
                                <td><img src={upcomingWeekIcons[0]}/></td>
                                <td><img src={upcomingWeekIcons[1]}/></td>
                                <td><img src={upcomingWeekIcons[2]}/></td>
                                <td><img src={upcomingWeekIcons[3]}/></td>
                                <td><img src={upcomingWeekIcons[4]}/></td>
                                <td><img src={upcomingWeekIcons[5]}/></td>
                                <td><img src={upcomingWeekIcons[6]}/></td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                <Toolbar instance={this.props.instance} screen={1} />
            </div>
        );
    }
}


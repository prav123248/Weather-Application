import React, {Component} from 'react';
import { trailSelect} from '../screen2Component/Dynamiccontainer';
import { readData } from '../screen2Component/readData';
import $ from 'jquery';
import './Forecastpopup.css'

var correctData;
var key;

export default class Forecastpopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingForecast:null
        }
    }


    forecastData = () => {

        var latitude =  correctData[1]
        var longitude = correctData[2]
        const units = "metric";
        const API_KEY = "65159ed447f6c9057beb2bf1aa2bcd61";
        var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&exclude=minutely,hourly,alerts&appid=' + API_KEY;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : (parsed) => {
                this.setState({upcomingForecast:parsed})
            },
            error : console.log("API failed")
        })
    }
    
    dayFormat = (date,num) => {
        var correctday = new Date(date.getTime() + ((24 * 60 * 60 * 1000) * num))
        var month = "" + (correctday.getMonth() + 1)
        var day = "" + correctday.getDate()
        var year = "" + correctday.getFullYear()

        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }
        return [day,month,year].join("/")
    }


    analyseDay = (dayForecast) => {
        var badConditions = ["Thunderstorm", "Rain", "Snow", "Dust", "Fog", "Ash", "Tornado", "Squall", "Sand", "Haze"]
        var goodConditions = ["Clear", "Clouds"]
        if (badConditions.includes(dayForecast['weather'][0]['main'])) {
            return {color:"#be0303"}
        }
        else if (goodConditions.includes(dayForecast['weather'][0]['main'])) {
            
            if (dayForecast['weather'][0]['main'] === "Clouds" && dayForecast['weather'][0]['id'] !== 801) {
                return {color:"yellow"}
            }

            if (dayForecast['wind_speed'] > 18) {
                return {color:"yellow"}
            }

            return {color:"#61ff13"}
        }
        else {
            return {color:"yellow"}
        }
    }


    formattedForecast = () => {
        if (this.state.upcomingForecast === null) {
            return (
                <div className="popupContent">
                    <p>Finding forecast</p>
                </div>
            )
        }

        if (this.props.screen === 2) {


            var today = new Date()
            var data = this.state.upcomingForecast

            return (
                <div className="popupContent">
                    <p class="nonCapital">Recommended hike days are coloured green. Days to avoid are in red and average days in yellow.</p>
                    <table>
                        <tbody>
                            <tr>
                                <th>Day</th>
                                <th>Condition</th>
                                <th>Humidity</th>
                                <th>Min|Max Temperature°</th>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][1])}>{this.dayFormat(today, 1)}</td>
                                <td>{data['daily'][1]['weather'][0]['main']}</td>
                                <td>{data['daily'][1]['humidity']}%</td>
                                <td>{Math.round(data['daily'][1]['temp']['min'])}|{Math.round(data['daily'][1]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][2])}>{this.dayFormat(today, 2)}</td>
                                <td>{data['daily'][2]['weather'][0]['main']}</td>
                                <td>{data['daily'][2]['humidity']}%</td>
                                <td>{Math.round(data['daily'][2]['temp']['min'])}|{Math.round(data['daily'][2]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][3])}>{this.dayFormat(today, 3)}</td>
                                <td>{data['daily'][3]['weather'][0]['main']}</td>
                                <td>{data['daily'][3]['humidity']}%</td>
                                <td>{Math.round(data['daily'][3]['temp']['min'])}|{Math.round(data['daily'][3]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][4])}>{this.dayFormat(today, 4)}</td>
                                <td>{data['daily'][4]['weather'][0]['main']}</td>
                                <td>{data['daily'][4]['humidity']}%</td>
                                <td>{Math.round(data['daily'][4]['temp']['min'])}|{Math.round(data['daily'][4]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][5])}>{this.dayFormat(today, 5)}</td>
                                <td>{data['daily'][5]['weather'][0]['main']}</td>
                                <td>{data['daily'][5]['humidity']}%</td>
                                <td>{Math.round(data['daily'][5]['temp']['min'])}|{Math.round(data['daily'][5]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][6])}>{this.dayFormat(today, 6)}</td>
                                <td>{data['daily'][6]['weather'][0]['main']}</td>
                                <td>{data['daily'][6]['humidity']}%</td>
                                <td>{Math.round(data['daily'][6]['temp']['min'])}|{Math.round(data['daily'][6]['temp']['max'])}</td>
                            </tr>

                            <tr>
                                <td style={this.analyseDay(data['daily'][7])}>{this.dayFormat(today, 7)}</td>
                                <td>{data['daily'][7]['weather'][0]['main']}</td>
                                <td>{data['daily'][7]['humidity']}%</td>
                                <td>{Math.round(data['daily'][7]['temp']['min'])}|{Math.round(data['daily'][7]['temp']['max'])}</td>
                            </tr>

                        </tbody>
                    </table>



                </div>
            )

        }

        else {
            const today = new Date();
            const scheduledDate = new Date(correctData[5])
            const day = 24 * 60 * 60 * 1000;
            var daysBetween = Math.round((scheduledDate.getTime() - today.getTime())/day) 


            if (daysBetween > 7) {

                return (
                    <div className="popupContent">
                        <p class="nonCapital">Weather for this hike cannot be forecasted as it is more than a week away. Please try again later.</p>
                    </div>
                )
            }
            else {
                var obtainedDataConditions = this.state.upcomingForecast['daily'][daysBetween]
                var foundCondition = obtainedDataConditions['weather'][0]['main']
                if (correctData[4] !== foundCondition) {
                    localStorage.setItem(key, JSON.stringify([correctData[0], correctData[1], correctData[2], correctData[3], foundCondition, correctData[4]]));
                }

                return (
                    <div className="popupContent">
                        <table>
                            <tbody>
                                <tr>
                                    <th class="biggerLighter">Condition : {correctData[4]}</th>
                                    <th class="biggerLighter">Humidity : {obtainedDataConditions['humidity']}</th>
                                    <th class="biggerLighter">Wind Speed {obtainedDataConditions['wind_speed']}</th>
                                    <th class="biggerLighter">Min|Max Temperature° : {Math.round(obtainedDataConditions['temp']['min'])}|{Math.round(obtainedDataConditions['temp']['max'])}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )

            }

        }
        
        /**else {
            //const today = new Date();
            //const scheduledDay = new Date(scheduleDate)
            //const day = 24 * 60 * 60 * 1000;
            //daysBetween = Math.round((scheduledDay.getTime() - today.getTime())/day) 
            var daysBetween = 3
            if (daysBetween < 7) {
              return (
                    <div className="popupContent">
                        <p></p>
                    </div>
                )
            }
            else {
                return (
                    <div className="popupContent">
                        <p>Weather for this hike cannot be forecasted as it is more than a week away. Please try again soon. </p>
                    </div>
                )
            }

        }
        */
    
    };

    componentDidMount() {
        var trails = readData()
        var selectedhike;
        
        if (this.props.screen === 2) {
            selectedhike = trailSelect
        }
        else {
            selectedhike = this.props.trail
        }
    
        for (var i=0; i<trails.length; i++) {
            if (trails[i][0] === selectedhike) {
                correctData = trails[i]
                key = i
                break
            }
        }
        
        this.forecastData();
            
        
    }

    render(){
        return (
            <div className="popup">
                <h4>{this.props.title}</h4>
                {this.formattedForecast()}
            </div>
        )
    }
}

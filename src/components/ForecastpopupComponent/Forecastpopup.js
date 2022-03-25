import React, {Component} from 'react';
import { trailSelect} from '../screen2Components/Dynamiccontainer';
import { readData } from '../readData';
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

    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Makes an API call to get and set upcoming weather data to be used by the popup.
    * 
    * The latitude and longitude are determined from a global variable containing the record of the saved trail. 
    * The API call on success will set the parsed contents to a state variable. On an error, a message is outputted to the console.
    * 
    * @param   
    * @return 
    */

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
    
    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Accepts a day and a value to return a correctly formatted version of value days after the given day.
    * 
    * The date variable is a given date. Num is how many days after the given date the method should return. The correct day obtains the time of the given date
    * and finds the time with the num * (total time for a day). This provides correctday in a Date type which has methods such as getMonth() that assist in formatting.
    * The month, day and year are extracted from the date type. A "0" is added to the start of months and days which are not two digits. These are then joined together and returned.
    * 
    * @param  (Date  date, Integer num)  
    * @return (String [day,month,year].join("/")
    */

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

    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Acts as a recommendation algorithm that returns a styling depending on the type of weather condition passed to it. 
    * 
    * A dayForecast is a string summarising the condition on a specific day. All possible bad and good conditions are stored in respective arrays.
    * If statements use the include method to check if the passed condition is present and this determines which colour will be returned from the method.
    * The first if statement returns red if bad conditions occur, the second makes additional checks even if good conditions are found before green is returned.
    * 
    * @param  (String dayForecast)  
    * @return (Object {color: yellow}) or (Object {color:#61ff13}) or (Object {color:#be0303})
    */

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

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Returns specific HTML depending on certain conditions such as whether the API call has finished or which screen is currently on.
    * 
    * The first if statement checks a state variable that will not be null if the API call has succeeded since the parsed content is saved into it.
    * The following if statements differentiate between the screen using the forecast popup to apply specific HTML for that specific screen.
    * Screen 2 obtains the date and creates 7 rows in a table that display a day in the week of the API data. Screen 3 finds a specific upcoming forecast, and then saves and displays it.
    * 
    * @param  ()  
    * @return (Object JSX HTML) or (Object JSX HTML) or (Object JSX HTML)
    */

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
                                    <th class="biggerLighter">Humidity : {obtainedDataConditions['humidity']}%</th>
                                    <th class="nonCapital biggerLighter">Wind Speed {obtainedDataConditions['wind_speed']}m/s</th>
                                    <th class="biggerLighter">Min|Max Temperature° : {Math.round(obtainedDataConditions['temp']['min'])}|{Math.round(obtainedDataConditions['temp']['max'])}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )

            }

        }
            
    };

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Once the first screen has been rendered, the record of the selected trail is found and globally stored. Then, an API call is made.
    * 
    * All stored trail data is obtained with the read command. The way the name of the selected hike is stored differs depending on the screen so an if statement stores each variant
    * in a common variable. A for loop iterates through the stored trails and finds a trail that matches the selected hike. The found record and its key are stored in a global variable.
    * An API call is then made which will make use of this data when finding the longitude and latitude coordinates.
    * 
    * @param  ()  
    * @return ()
    */

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

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The render method displays the title passed as a prop and calls a method to dynamically determine what to display below.
    * 
    * The title stored in a prop named title is displayed in a h4 tag. The formattedForecast method will provide the remaining content which changes depending on factors such as
    * the progress of the API call and which screens are implementing this component.
    * 
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */

    render(){
        return (
            <div className="popup">
                <h4>{this.props.title}</h4>
                {this.formattedForecast()}
            </div>
        )
    }
}

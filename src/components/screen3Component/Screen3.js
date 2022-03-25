import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'
import $ from 'jquery';
import { readData } from '../readData';
import { removeHike } from '../removeData';
import Forecastpopup from '../ForecastpopupComponent/Forecastpopup';

//Icon imports
import cloudy from '../../assets/icons/cloudy.png'
import sunny from '../../assets/icons/sunny.png'
import rain from '../../assets/icons/rain.png'
import heavy from '../../assets/icons/heavy-rain.png'
import snow from '../../assets/icons/snow.png'

export var hikeSelected;

export default class Screen3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trail: "",
            trigger: false
        }

    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method unselects a selected hike. As a hike being selected is determined by the trail state variable being an empty string, this method deselects a hike by resetting its value.
    * 
    * When a hike is selected but needs to be unselected, this method can be called and will reset the value of the trail state variable. The global variable hikeSelected is also
    * reset as when a hike is not selected, this is also an empty string. This becomes useful when removing a hike as after the remove, the removed hike must be deselected so it is
    * no longer visibile on the page.
    * 
    * @param  ()  
    * @return ()
    */
    deselectHike = () => {
        this.setState({
            trail : ""
        })
        hikeSelected = ""
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method outputs different JSX expressions to render depending on whether a hike has been selected or not.
    * 
    * 
    * The method accepts an array containing saved records of trails that have been scheduled for hikes. If no trail has been selected, the method returns a message informing the
    * user that a trail can be selected. If a trail has been selected, the record for that trail is found in the scheduledTrails array. Details on the forecast stored within this
    * record is displayed to the user and the popup method is called, which in turn displays a Forecastpopup component in certain states of this component.
    * 
    * @param  ([] scheduledTrails)  
    * @return (Object JSX HTML)
    */

    selectedDisplay = (scheduledTrails) => {
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
                        <button id="removeSchedule" onClick={() => { removeHike(); this.deselectHike()}} type="button">Remove Hike</button>
                    </div>

                    {this.popup()}
                </div>
            )
        }
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * If the trigger state of this component is true, the Forecastpopup component is rendered.
    * 
    * The Forecastpopup is rendered if the state of the trigger is set to true. This method is only called when a trail has been selected so the selected trail 
    * is passed as a prop as well as the title and screen.
    * 
    * 
    * @param  ()  
    * @return (Object JSX HTML), (None)   
    */

    popup = () => {
        if (this.state.trigger === true) {
            return <Forecastpopup title="Forecasted Weather" trail={this.state.trail} screen={3}  />
        }        
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * changeTrigger reverses the state of the trigger state variable. This is used by buttons to modify the state to change whether the popup method should render
    * a Forecastpopup or not.
    *  
    * @param  ()  
    * @return ()
    */

    changeTrigger = () => {
        if (this.state.trigger === true) {
            this.setState({trigger: false})
        }
        else {
            this.setState({trigger: true})
        }
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method assigns elements with class type .scheduledRow a click function which will involve calling a method called changeTrail.
    * 
    * When an element with the scheduledRow is clicked, the value of the trail state variable will change to the name of the trail. This will
    * result in a new page being rendered specifically for managing the trail that was entered. The method below assigns the click function through JQuery
    * but does not perform the action itself. 
    * 
    * @param  ()  
    * @return ()
    */    
    scheduleOnClick = () => {
        const self = this;
        $('.scheduledRow').on('click', function () {
            var el = $(this).children('.scheduleName').text();
            if (el !== "Trail Name") {
                self.changeTrail(el)
            }
        });        
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The changeTrail method will accept a string in selectedTrail that refers to the trail name. It will use this to change state variables in order to dynamically render new content.
    * 
    * The name of the trail is passed to this method and stored in the trail state. This will cause changes to occur in what gets rendered. The trigger is also set to false
    * as when a new hike has been selected, any existing popup for a previously selected hike must be hidden.    * 
    * 
    * @param  ()  
    * @return ()
    */

    changeTrail = (selectedTrail) => {
        this.setState({
            trail:selectedTrail,
            trigger: false
        })
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * After  the first render, componetDidMount will call a method that uses JQuery to assign click functions to elements within the DOM.
    * 
    * ComponentDidMount will wait till the first render is complete and then call the scheduleOnClick method that will assign click functions
    * to elements within the DOM. It is crucial that this method is called after the first render as if it was called before, then nothing would happen
    * as the click function would find no elements of the specified type to assign the function to.
    * 
    * @param  ()  
    * @return ()
    */
    componentDidMount() {
        this.scheduleOnClick();
        
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method determines what content to display to the user depending on whether any trails have been scheduled or not.
    * 
    * The scheduledTrails passed to this method holds an array containing records of trails that have been scheduled for hikes.
    * If the size of the array is 0, no schedules have been scheduled so an appropriate message is outputted. Otherwise, a row for each
    * trail within the array is added to the HTML table using the map method.
    * 
    * @param  ([] scheduledTrails)  
    * @return (Object JSX HTML)
    */
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

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The method below accepts a string that contains a specific condition. A HTML image tag is returned containing the appropriate image for the condition passed to the method.
    * 
    * Weather is a string that refers to the general condition of a forecast. If statements are used to return the appropriate image for the condition specified in the weather
    * string. N/A is used when the weather does not match one of the conditions below, generally meaning that the forecast is not determinable yet.
    * 
    * 
    * @param  (String weather)  
    * @return (Object JSX HTML), (String "N/A")
    */
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

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The render method obtains a list of all trail and stores in a new array, trails that have been scheduled for hikes. Methods are then responsible for rendering elemnents of the page, based on the arrays contents.
    * 
    * The render method calls the read method to obtain a list of all stored trails. It then collects records of trails that have been scheduled by observing whether the scheduled date
    * field is null or not. This array is passed to methods displaySchedule and selectedDisplay which both dynamically make use of the array to alter how the screen is rendered.
    *     * 
    * @param  ()  
    * @return (Object JSX HTML)
    */

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
                
                {this.selectedDisplay(scheduledTrails)}



                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

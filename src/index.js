import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Screen1 from './components/screen1Component/Screen1';
import Screen2 from './components/screen2Components/Screen2';
import Screen3 from './components/screen3Component/Screen3';
import Loading from './components/loadingComponent/Loading';
import './styles/common.css';
import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedScreen : 1,
            dataLoaded : false,
            loadingMessage : "Loading (Ensure location services are enabled)"
        }

    };

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Screen switch is used to change the state of a variable that represents which screen should be displayed. This will alter which screen component is rendered.
    * 
    * The screen switch method will change the value of the selectedScreen state to the passed value. If statements below use this to determine which screen to render.
    *  
    * 
    * @param  (Integer val)  
    * @return ()
    */

    screenSwitch(val) {
        this.setState({
            selectedScreen : val
        });
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * After the first screen for loading has rendered, the componentDidMount will call a method that starts collecting data to eventually form an API request.
    * 
    * The first screen to be rendered will be a loading screen. The main screen 1 requires data from the API before it can be displayed. Therefore, after the loading
    * screen has been rendered, the below method determines coordinates of the current location to eventually obtain data from the API. Following this, the main screens
    * can render.
    * 
    * @param  ()  
    * @return ()
    */
    componentDidMount() {
        this.getLocation()

    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method obtains the current location uses navigator which will obtain the users current GPS coordinate location. This is then passed to the API caller.
    * 
    * The navigator will check if location services are turned on in the browser. The current position will then be determined and passed to a method 
    * that handles making the API call. If location services are off, a message is set to later be used for the loading component.
    * 
    * 
    * @param  ()  
    * @return ()
    */
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.apiCall)
            
        }
        else {
            this.setState({loadingMessage : "Could not obtain your current location, please switch browser or ensure location services are enabled"})
        }
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The method below is responsible for making the API call. It obtains the position from the navigator and uses Ajax in JQuery to make a request.
    * 
    * The longitude and latitude are isolated from the position the navigator passed. States of the component are set to rounded versions of the coordinates for later display.
    * A URL is formed with the format specified by OpenWeatherMap, specifically the units, API key and both coordinates. An Ajax call is made to the URL with success resulting
    * in a call to a method to parse the results and failure to a specific loading message to be set. 
    * 
    * @param  (Object position)  
    * @return ()
    */

    apiCall = (position) => {
        //Current Location Coordinates
        var longitude = position.coords.longitude;
        var latitude =  position.coords.latitude;

        //Rainy Location Coordinates (We used in the video to demonstrate a Rainy location as our app always works with our location)
        //var longitude = 80.7718;
        //var latitude =  7.8731;

        //Sunny Location Coordinates (We used in the video to demonstrate a Sunny location as our app always works with our location)
        //var longitude = -74;
        //var latitude =  40.69;

        this.setState({
            longitude: Math.round(longitude),
            latitude: Math.round(latitude)
        })
        const units = "metric";
        const API_KEY = "65159ed447f6c9057beb2bf1aa2bcd61";
        var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&exclude=minutely,hourly,alerts&appid=' + API_KEY;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : this.parseResponse,
            error : this.setState({loadingMessage : "API call failed, data cannot be retrieved, please try again later"})
        })
        
    }

    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The parseResponse will go through the recieved data and store different and relevant types into variables.
    * 
    * The data recieved from the API call is accessed using the parameter parsed. Relevant pieces of it are stored to later 
    * transfer as props to different components. The dataLoaded is set to true as data has been successfully collected so screens that require data can now be displayed.
    *
    * 
    * @param  ()  
    * @return ()
    */

    parseResponse = (parsed) => {
        this.setState({
            currentData: {
                humidity: parsed['current']['humidity'],
                visibility: parsed['current']['visibility'],
                temperature: parsed['current']['temp'],
                message: parsed['current']['weather'][0],
                windSpeed: parsed['current']['wind_speed'],
                windDirection: parsed['current']['wind_deg']
           },
            upcomingData: parsed['daily'],
            dataLoaded : true
            
        });

        

    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Different screen components are rendered depending on the state of loading and the selected screen.
    * 
    * A loading screen is displayed until data has been collected. The message is passed as a prop so will be dynamically different depending on the part of the app that the
    * component is waiting on. Once data has been loaded, by default the selected screen is on one and will render the first screen. This can be switched with the taskbar and 
    * will result in different screens being rendered.
    * 
    * @param  ()  
    * @return ()
    */

    render(){
        if (this.state.dataLoaded === false) {
            return <Loading message={this.state.loadingMessage} condition="Loading" />
            
        }
        else if (this.state.selectedScreen === 3) {
            return (<Screen3 instance={this} condition={this.state.currentData['message']['main']} />)
        }
        else if (this.state.selectedScreen === 2) {
            return (<Screen2 instance={this} data={this.state.data} condition={this.state.currentData['message']['main']} />)
            }
        else {
            return (<Screen1 instance={this} currentData={this.state.currentData} upcomingData={this.state.upcomingData} long={this.state.longitude} lat={this.state.latitude} condition={this.state.currentData['message']['main']} />)
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Screen1 from './components/screen1Component/Screen1';
import Screen2 from './components/screen2Component/Screen2';
import Screen3 from './components/screen3Component/Screen3';
import Loading from './components/loadingComponent/Loading';
import './styles/common.css';
import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedScreen : 2,
            dataLoaded : false,
            loadingMessage : "Loading (Ensure location services are enabled)"
        }

    };
        
    screenSwitch(val) {
        this.setState({
            selectedScreen : val
        });
    }

    componentDidMount() {
        this.getLocation()

    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.apiCall)
            
        }
        else {
            this.setState({loadingMessage : "Could not obtain your current location, please switch browser or ensure location services are enabled"})
        }
    }

    apiCall = (position) => {
        var longitude = position.coords.longitude;
        var latitude =  position.coords.latitude;
        this.setState({
            longitude: Math.round(longitude),
            latitude: Math.round(latitude)
        })
        const units = "metric";
        //const API_KEY = "c8f3d6883986e24d20be5f086d83162a";
        const API_KEY = "65159ed447f6c9057beb2bf1aa2bcd61";
        var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&exclude=minutely,hourly,alerts&appid=' + API_KEY;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : this.parseResponse,
            error : this.setState({loadingMessage : "API call failed, data cannot be retrieved, please try again later"})
        })
        
    }

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
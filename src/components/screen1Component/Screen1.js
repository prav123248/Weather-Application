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


export default class Screen1 extends Component {
    constructor(props) {
        super(props);
    }



    render(){
        const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        const today = new Date();

        return (
            <div id="screen1" className="container">   
                <Header />
                <div className="currentContainer">
                    <p id="Location">Horsenden Hill</p>
                    <p id="temp">{Math.round(this.props.currentData.temperature)}°</p>
                    <p className="tempstats">Visibility : {this.props.currentData.visibility}</p>
                    <p className="tempstats">Humidity : {this.props.currentData.humidity}%</p>
                    <p className="tempstats">{this.props.currentData.message}</p>
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
                                <td><img src={sunny}/></td>
                                <td><img src={sunny}/></td>
                                <td><img src={sunny}/></td>
                                <td><img src={snow}/></td>
                                <td><img src={cloudy}/></td>
                                <td><img src={heavy}/></td>
                                <td><img src={rain}/></td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                <Toolbar instance={this.props.instance} screen={1} />
            </div>
        );
    }
}


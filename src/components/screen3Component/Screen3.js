import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'
import $ from 'jquery';

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
                    <p class="scheduleMessage">Select a trail to view details or update the forecast</p>
                </div>
            )
        }
        else {
            return (
                <div class="scheduleDetailContainer">
                    <h3>Trail : {this.state.trail}</h3>
                    <p class="scheduleForecast scheduleMessage">Last Checked : <img src={snow}/></p>
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

    render(){
        return (
                
            <div id="screen3" className="container">   
                <Header />
                <div class="scheduleContainer">
                    <h2>Trail Schedule</h2>
                    <div class="scheduleTable">
                        <table>
                            <tbody>
                                <tr class="scheduledRow">
                                    <th class="scheduleDate">Date</th>
                                    <th class="scheduleName">Trail Name</th>
                                    <th class="scheduleForecast">Forecast</th>
                                </tr>

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Harrow</td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Harrow</td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   
                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">asdasdadausdh aushd asu hdasduiash duas daisu daihd asihd isuhd asuihdaishdiaushdisaBritain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr> 

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={snow}/></td>
                                </tr>   

                                <tr class="scheduledRow">
                                    <td class="scheduleDate">23/01/21</td>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleForecast"><img src={sunny}/></td>
                                </tr>   
                            </tbody>
                        </table>

                    </div>
                </div>
                
                {this.scheduledDescription()}



                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

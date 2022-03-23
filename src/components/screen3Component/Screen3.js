import React, {Component} from 'react';
import '../../styles/common.css'
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'

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
    }
    render(){
        return (
                
            <div id="screen3" className="container">   
                <Header />
                <div class="upperScrollContainer">
                    <h2>Trail Schedule</h2>
                    <div class="scrollableTable">
                        <table>
                            <tbody>
                                <tr>
                                    <th class="scheduleName">Trail Name</th>
                                    <th class="scheduleDate">Date</th>
                                    <th class="scheduleCondition">Condition</th>
                                </tr>

                                <tr>
                                    <td class="scheduleName">Harrow</td>
                                    <td class="scheduleDate">23/01/21</td>
                                    <td><img src={snow}/></td>
                                </tr>   

                                <tr>
                                    <td class="scheduleName">Britain</td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr>   
                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr>   

                                <tr>
                                    <td class="scheduleName">asdasdadausdh aushd asu hdasduiash duas daisu daihd asihd isuhd asuihdaishdiaushdisaBritain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 
                            </tbody>
                        </table>

                    </div>
                </div>
                
                <div class="addSchedule">


                    <h3>Schedule a Hike</h3>
                    <div class="formContainer">
                        <div class="smallPadding scheduleSelecter">
                            <select name="trails">
                                <option value="" selected="selected" disabled>Select Trail</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                                <option value="London">London</option>
                            </select>
                        </div>

                        <div class="smallPadding">
                            <input type="date" name="scheduledDate"/>
                        </div>

                        <input id="scheduleSubmit" type="submit" value="Submit"/>
                    </div>

                        

                </div>


                <Toolbar instance={this.props.instance} screen={3} />
            </div>
        );
    }
}

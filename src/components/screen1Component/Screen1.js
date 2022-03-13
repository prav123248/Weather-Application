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
        return (
            <div id="screen1" className="container">   
                <Header />
                <div className="currentContainer">
                    <p id="Location">Horsenden Hill</p>
                    <p id="temp">27°</p>
                    <p className="tempstats">Visibility : Clear</p>
                    <p className="tempstats">Humidity : 67%</p>
                    <p className="tempstats">Expect light winds</p>
                </div>

                <div className="upcomingContainer">
                    <table>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>

                        <tr>
                            <td>22</td>
                            <td>30</td>
                            <td>-3</td>
                            <td>-13</td>
                            <td>23</td>
                            <td>30</td>
                            <td>-20</td>
                        </tr>

                        <tr>
                            <td>10</td>
                            <td>-30</td>
                            <td>45</td>
                            <td>-23</td>
                            <td>10</td>
                            <td>-05</td>
                            <td>30</td>
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


                    </table>

                </div>

                <Toolbar instance={this.props.instance} screen={1} />
            </div>
        );
    }
}
